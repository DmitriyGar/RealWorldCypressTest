
import testData from "../testData/testDataNewUser.json"

export class SearchTransactions {

    searchTransaction (searchWord:string)  {
        cy.log(`Search transaction via API`)
        return cy.request({
            method: 'GET',
            url: `http://localhost:3001/users/search?q=${searchWord}`,
            headers: {
                'Cookie': cy.getCookie('connect.sid'),
            }
        }).then(response => {
            expect(response.status).equal(200)
        }).its('body.results')
     }
 }