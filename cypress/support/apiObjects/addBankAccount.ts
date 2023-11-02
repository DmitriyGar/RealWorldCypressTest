export class addBankAccountAPI {

    addBankAccountRequest(userId: string, bankAccountName: string, accountNumber: string, routingNumber: string) {

        cy.log(`Create bank account request with parameters: userId: ${userId}, bankAccount: ${bankAccountName}, accountNumber: ${accountNumber}, routingNumber: ${routingNumber}`)
        return cy.request({
            url: 'http://localhost:3001/graphql',
            method: 'POST',
            headers: {
                'Cookie': cy.getCookie('connect.sid'),
                'Content-Type': 'application/json'
            },
            body: `{
                "operationName": "CreateBankAccount",
                "query": "\n  mutation CreateBankAccount($bankName: String!, $accountNumber: String!, $routingNumber: String!) {\n    createBankAccount(\n      bankName: $bankName\n      accountNumber: $accountNumber\n      routingNumber: $routingNumber\n    ) {\n      id\n      uuid\n      userId\n      bankName\n      accountNumber\n      routingNumber\n      isDeleted\n      createdAt\n    }\n  }\n",
                "variables": {
                  "userId": "${userId}",
                  "bankName": "${bankAccountName}",
                  "accountNumber": "${accountNumber}",
                  "routingNumber": "${routingNumber}"
                }
              }`
        }).then(response => {
            expect(response.status).to.equal(201)
        }).its('response.body.user')
    }
}