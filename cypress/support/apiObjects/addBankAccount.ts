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
            body: `{"operationName":"CreateBankAccount","query":"  mutation CreateBankAccount($bankName: String!, $accountNumber: String!, $routingNumber: String!) {    createBankAccount(      bankName: $bankName      accountNumber: $accountNumber      routingNumber: $routingNumber    ) {      id      uuid      userId      bankName      accountNumber      routingNumber      isDeleted      createdAt    }  }","variables":{"userId":"${userId}","bankName":"Bank Account #2","accountNumber":"000000000003","routingNumber":"000000002"}}`
        }).then(response => {
            expect(response.status).to.equal(200)
        }).its('body.data.createBankAccount')
    }
}