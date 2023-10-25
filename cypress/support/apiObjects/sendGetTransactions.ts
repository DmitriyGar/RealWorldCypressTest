
import testData from "../testData/testDataNewUser.json"

export class SendGetTransactions {

    sendTransaction (senderId:string, receiverId:string, amount:string, description:string='test')  {
         cy.log(`send transaction with amount:${amount} via API`)
         const payload = {
          transactionType: "payment",
          amount: amount,
          description: description,
          senderId: senderId,
          receiverId: receiverId
         }
         cy.request({
            method: 'POST',
            url: 'http://localhost:3001/transactions',
            headers: {
                'Cookie': cy.getCookies(),
            },
            body: payload
         }).then(response => {
         expect(response.status).equal(200)
         console.log(response.body)
         //expect(response.body.user.username).equal(username)
         })
     }
 }