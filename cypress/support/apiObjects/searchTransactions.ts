
import testData from "../testData/testDataNewUser.json"

export class SearchTransactions {

    searchTransaction (searchWord:string)  {
         cy.log(`search transaction via API`)

         cy.request('GET', `http://localhost:3001/users/search?q=${searchWord}`).then(response => {
         expect(response.status).equal(200)
         console.log(response)
         //expect(response.body.user.username).equal(username)
         })
     }
 }