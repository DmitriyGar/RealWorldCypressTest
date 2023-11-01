
import testData from "../testData/testDataNewUser.json"

export class SendGetTransactions {

    sendTransaction(senderId: string, receiverId: string, amount: string, description: string = 'test send transaction') {
        cy.log(`Send transaction via API from ${senderId} to ${receiverId} with amount:${amount} and description ${description}`)
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
                'Cookie': cy.getCookie('connect.sid'),
            },
            body: payload
        }).then(response => {
            expect(response.status).equal(200)
        })
    }

    requestTransaction(senderId: string, receiverId: string, amount: string, description: string = 'test request transaction') {
        cy.log(`Request transaction via API from ${senderId} to ${receiverId} with amount:${amount} and description ${description}`)
        const payload = {
            transactionType: "request",
            amount: amount,
            description: description,
            senderId: senderId,
            receiverId: receiverId
        }
        cy.request({
            method: 'POST',
            url: 'http://localhost:3001/transactions',
            headers: {
                'Cookie': cy.getCookie('connect.sid'),
            },
            body: payload
        }).then(response => {
            expect(response.status).equal(200)
        })
    }
}