import { Pages } from "../../support/pageObjects/Pages"
import { negativeOrPositiveAmountWrapper } from "../../support/helpers/HelpMethods";
import testData from "../../support/testData/testDataNewUser.json"
import { ApiObjectBase } from "../../support/apiObjects/apiObjectBase"
import * as apiHelpers from "../../support/helpers/v2/api/apiHelpers"
import * as helpers from "../../support/helpers/v2/ui/verifyHomePage.helper"


let pages = new Pages();
let apiObjectBase = new ApiObjectBase()

describe('Verify Home page', () => {

    let postFixName1 = (new Date().toISOString()).slice(14).split('').filter(a => !['.', ':', 'Z'].includes(a)).join('') + '1';
    let postFixName2 = (new Date().toISOString()).slice(14).split('').filter(a => !['.', ':', 'Z'].includes(a)).join('') + '2';
    let amountUser1ToUser2 = 2100;
    let amountUser2ToUser1 = 1100;
    let testDescription1 = 'test description1';
    let testDescription2 = 'test description2';

    beforeEach('Preconditions', () => {

        apiObjectBase.createUserAPI.createUserRequest(testData.userName + postFixName1, testData.firstName + postFixName1, testData.lastName + postFixName1, testData.password)
        apiObjectBase.createUserAPI.createUserRequest(testData.userName + postFixName2, testData.firstName + postFixName2, testData.lastName + postFixName2, testData.password)
        apiHelpers.sendTransactionsBetweenUsersAPI(testData.userName + postFixName1, testData.firstName + postFixName2, '' + amountUser1ToUser2, testDescription1)
        apiHelpers.requestTransactionsBetweenUsersAPI(testData.userName + postFixName2, testData.firstName + postFixName1, '' + amountUser1ToUser2, testDescription2)
        apiHelpers.sendTransactionsBetweenUsersAPI(testData.userName + postFixName2, testData.firstName + postFixName1, '' + amountUser2ToUser1, testDescription1)
        apiHelpers.requestTransactionsBetweenUsersAPI(testData.userName + postFixName1, testData.firstName + postFixName2, '' + amountUser2ToUser1, testDescription2)
        apiObjectBase.loginUserAPI.loginAPI(testData.userName + postFixName1, testData.password).then(user => {
            apiObjectBase.addBankAccount.addBankAccountRequest(user.id, testData.bankAccountName, testData.AccountNumber, testData.routingNumber)
        })

        cy.visit('/')
        cy.loginUI(testData.userName + postFixName1, testData.password) 
        cy.wait(1000)
    })

    it('Verify UI elements presence on Home Page', () => {
        pages.navigationMenu.openHomePage();
        pages.homePage.getSelectedTab().should('contain', 'Everyone')
        pages.homePage.getEveryoneTab().should('be.visible')
        pages.homePage.getEveryoneTab().should('contain', 'Everyone')
        pages.homePage.getFriendsTab().should('be.visible')
        pages.homePage.getFriendsTab().should('contain', 'Friends')
        pages.homePage.getMineTab().should('be.visible')
        pages.homePage.getMineTab().should('contain', 'Mine')
        pages.homePage.getDatePicker().should('be.visible')
        pages.homePage.getDatePicker().should('contain', 'ALL')
        pages.homePage.getAmountSlider().should('be.visible')
        pages.homePage.getAmountSlider().should('contain', 'Amount:')
    })

    it('Verify transactions on EVERYONE tab of Home Page match API', () => {

        var checkTransactionsUImatchAPI = function (page: number = 1) {
            let parametr: string = ''
            if (page > 1) {
                parametr = `/?page=${page}`
            }
            cy.request({
                url: `http://localhost:3001/transactions/public${parametr}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                }
            }).then(response => {
                expect(response.status).to.equal(200)
                console.log(response.body)
                for (let n = 0; n < response.body.results.length; n++) {
                    pages.homePage.getPaymentPriceTransactionValueById(response.body.results[n].id).invoke('prop', 'innerText')
                        .should('equal', negativeOrPositiveAmountWrapper(response.body.results[n].amount, response.body.results[n].requestStatus, response.body.results[n].status))
                    pages.homePage.getNameSentTransactionById(response.body.results[n].id).invoke('prop', 'innerText')
                        .should('equal', response.body.results[n].senderName)
                    pages.homePage.getNameReceivedTransactionById(response.body.results[n].id).invoke('prop', 'innerText')
                        .should('equal', response.body.results[n].receiverName)
                    pages.homePage.getPaymentLabelTransactionById(response.body.results[n].id).invoke('prop', 'innerText')
                        .should('equal', response.body.results[n].description)
                    if (n == response.body.results.length - 1) {
                        page++;
                        cy.get('[aria-label="grid"]').focus().scrollTo('bottom')
                        checkTransactionsUImatchAPI(page)
                    }
                }
            }
            )
        }

        pages.navigationMenu.openHomePage();

        checkTransactionsUImatchAPI();
    })

    it('Verify filtering of transactions by Amount range on EVERYONE tab', () => {
        cy.log('filter between 100 and 130')
        pages.homePage.getAmountSlider().click({force: true})
        for(let i=0;i<4;i++)
        pages.homePage.getAmountSliderStartPoint().click(10, 0, { force: true })
        for(let i=0;i<31;i++)
        pages.homePage.getAmountSliderEndPoint().click(0, 10, { force: true })
        cy.wait(1000)
        pages.homePage.getTableTransactions().find('li div div div.MuiGrid-grid-sm-true').each(item =>{
            cy.wrap(item).find(':nth-child(2)').eq(3).find('span').then(price =>{
                let str=Number(price.text().slice(2))
                expect(str).greaterThan(100).and.lessThan(130)
            })
        })
    })

    it('Verify filtering between 450 and 520 then Clear filter on EVERYONE tab',  () => {
        cy.log('filter between 450 and 520')
        pages.homePage.getAmountSlider().click({force: true})
        for(let i=0;i<22;i++){
        pages.homePage.getAmountSliderStartPoint().click(10, 0, { force: true })
        }
        for(let i=0;i<16;i++)
        pages.homePage.getAmountSliderEndPoint().click(0, 7, { force: true })
        cy.wait(1000)
        pages.homePage.getTableTransactions().find('li div div div.MuiGrid-grid-sm-true').each(item =>{
            cy.wrap(item).find(':nth-child(2)').eq(3).find('span').then(price =>{
                let str=Number(price.text().slice(2))
                expect(str).greaterThan(450).and.lessThan(520)
                cy.get('[aria-label="grid"]').focus().scrollTo(0,128,{ensureScrollable: false})
            })
        })

        pages.homePage.getSliderScreenClearButton().click().wait(1000)
        pages.homePage.getSliderScreenLabel().should('contain','$0 - $1,000')
        pages.homePage.getTableTransactions().find('li div div div.MuiGrid-grid-sm-true').each(item =>{
            cy.wrap(item).find(':nth-child(2)').eq(3).find('span').then(price =>{
                let str=Number(price.text().slice(2))
                expect(str).greaterThan(0).and.lessThan(1000)
                cy.get('[aria-label="grid"]').focus().scrollTo(0,128,{ensureScrollable: false})
            })
        })
    })

    it.only('Verify transactions on MINE tab of Home Page', () => {

        pages.navigationMenu.openHomePage();
        pages.homePage.getMineTab().click()
        cy.wait(500)
        let n = 0
        while (n < 4) {
            if (n == 0) {
                pages.homePage.getNameSentTransaction(n)
                    .should('contain', testData.firstName + postFixName1 + ' ' + testData.lastName + postFixName1)
                pages.homePage.getPriceTransaction(n).invoke('prop', 'innerText').should('contain', '+$1,100.00')
                pages.homePage.getPaymentLabelTransaction(n).should('contain', 'requested')
                pages.homePage.getNameReceivedTransaction(n)
                    .should('contain', testData.firstName + postFixName2 + ' ' + testData.lastName + postFixName2)
                pages.homePage.getDescriptionTransaction(n).should('have.text', testDescription2)
            } else if (n == 1) {
                pages.homePage.getNameSentTransaction(n)
                    .should('contain', testData.firstName + postFixName2 + ' ' + testData.lastName + postFixName2)
                pages.homePage.getPriceTransaction(n).invoke('prop', 'innerText').should('contain', '-$1,100.00')
                pages.homePage.getPaymentLabelTransaction(n).should('contain', 'paid')
                pages.homePage.getNameReceivedTransaction(n)
                    .should('contain', testData.firstName + postFixName1 + ' ' + testData.lastName + postFixName1)
                pages.homePage.getDescriptionTransaction(n).should('have.text', testDescription1)
            } else if (n == 2) {
                pages.homePage.getNameSentTransaction(n)
                    .should('contain', testData.firstName + postFixName2 + ' ' + testData.lastName + postFixName2)
                pages.homePage.getPriceTransaction(n).invoke('prop', 'innerText').should('contain', '+$2,100.00')
                pages.homePage.getPaymentLabelTransaction(n).should('contain', 'requested')
                pages.homePage.getNameReceivedTransaction(n)
                    .should('contain', testData.firstName + postFixName1 + ' ' + testData.lastName + postFixName1)
                pages.homePage.getDescriptionTransaction(n).should('have.text', testDescription2)
            } else if (n == 3) {
                pages.homePage.getNameSentTransaction(n)
                    .should('contain', testData.firstName + postFixName1 + ' ' + testData.lastName + postFixName1)
                pages.homePage.getPriceTransaction(n).invoke('prop', 'innerText').should('contain', '-$2,100.00')
                pages.homePage.getPaymentLabelTransaction(n).should('contain', 'paid')
                pages.homePage.getNameReceivedTransaction(n)
                    .should('contain', testData.firstName + postFixName2 + ' ' + testData.lastName + postFixName2)
                pages.homePage.getDescriptionTransaction(n).should('have.text', testDescription1)
            }
            n++
        }

        
        /* pages.homePage.getTableTransactions().invoke('attr','style').then( (css)=>{
             let array:string[]|undefined=[];
             if (typeof(css)==='string'){
             array=css.toString().split('; ')
             let height=Number(array[1].split(': ')[1].slice(0,-2))
             console.log(height)
             cy.get('[aria-label="grid"]').focus().scrollTo('top')
             console.log(css)
             }
         })
  */
    })

})


