import { id } from "date-fns/locale";
import { ApiObjectBase } from "../../../support/apiObjects/apiObjectBase"
import testData from "../../../support/testData/testDataNewUser.json"

describe('Create account via API', () => {
    let apiObjectBase = new ApiObjectBase();

    it('Send request for creating user', () => {
        let postStr='2'
        apiObjectBase.createUserAPI.createUserRequest(testData.userName+postStr, testData.firstName+postStr, testData.lastName+postStr, testData.password+postStr)
        apiObjectBase.loginUserAPI.loginAPI(testData.userName+postStr, testData.password+postStr)
    })

    it.only('login user', () => {
       createTwoUsersWithTransactions('1','2')
    })

    function createTwoUsersWithTransactions(postFixName1:string, postFixName2:string){
        
        apiObjectBase.createUserAPI.createUserRequest(testData.userName+postFixName1, testData.firstName+postFixName1, testData.lastName+postFixName1, testData.password+postFixName1)
        apiObjectBase.createUserAPI.createUserRequest(testData.userName+postFixName2, testData.firstName+postFixName2, testData.lastName+postFixName2, testData.password+postFixName2)

        cy.intercept('POST', 'http://localhost:3001/login').as('postTransaction1')
        cy.visit('/')
        cy.loginUI(testData.userName+postFixName1,testData.password+postFixName1)
        cy.wait('@postTransaction1')
        cy.get('@postTransaction1').its('response.body.user').then(xhr1 => {
            console.log(xhr1)
            sendTransactionUserToUser(xhr1.id,testData.firstName+postFixName2,'100','test1')
        }) 

        cy.clearAllCookies().clearAllLocalStorage()
        
        cy.intercept('POST', 'http://localhost:3001/login').as('postTransaction2')
        cy.visit('/')
        cy.loginUI(testData.userName+postFixName2,testData.password+postFixName2)
        cy.wait('@postTransaction2')
        cy.get('@postTransaction2').its('response.body.user').then(xhr2 => {
            console.log(xhr2.id)
            cy.wait(1000)
            sendTransactionUserToUser(String(xhr2.id),testData.firstName+postFixName1,'101','test2')
        }) 
    }

    function sendTransactionUserToUser(senderId:string,receiverName:string,amount:string,description:string){
       cy.log(`POST transaction from ${senderId} to ${receiverName}`)
       cy.request({
            method: 'GET',
            url: `http://localhost:3001/users/search?q=${receiverName}`,
            headers: {
              'Cookie': cy.getAllCookies(),
            },
          }).its('body.results').then(results =>{
            let array:string[] = results
            for(let item of results){
                if(item.firstName==receiverName){
                    console.log(item.firstName)
                    cy.wrap(item.id).then(id=>{
                        console.log(id) 
                        apiObjectBase.sendGetTransactions.sendTransaction(senderId,String(id),amount,description)
                      })
                } 
            }
          })

    }

})
