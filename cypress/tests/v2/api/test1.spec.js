describe('api test1', () => {

    beforeEach('preconditions', () => {
        // cy.visit('/')
        // cy.intercept('GET', 'http://localhost:3001/transactions/public', { fixture: 'test_transactions.json' }).as('getTransaction')
        cy.loginByApi()

    })

    it('Test1 (intercept API) -> send money', () => {
        const pay = 122
        cy.intercept('POST', 'http://localhost:3001/transactions').as('postTransaction')

        cy.contains('.MuiButton-label', 'New').click()
        cy.get('[class="MuiPaper-root makeStyles-paper-54 MuiPaper-elevation0 MuiPaper-rounded"]').then(search => {
            cy.wrap(search).find('#user-list-search-input').type('devon')
            cy.wrap(search).find('[data-test="users-list"]').each(item => {
                cy.wrap(item).contains('span', 'Devon Becker').click()
                cy.get('[class="MuiGrid-root MuiGrid-container MuiGrid-direction-xs-column MuiGrid-align-items-xs-center"]')
                    .find('[class="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary MuiTypography-gutterBottom"]')
                    .invoke('prop', 'innerText').should('contain', 'Devon Becker')
            })

            cy.get('#amount').type(pay)
            cy.get('#transaction-create-description-input').type('test_note')
            cy.contains('[data-test="transaction-create-submit-payment"]', 'Pay').click()
            cy.get('[class="MuiBox-root MuiBox-root-67"]').find('[class="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary MuiTypography-gutterBottom"]')
                .invoke('prop', 'innerText').should('contain', 'Paid $' + pay.toFixed(2) + ' for test_note')
        })

        cy.wait('@postTransaction')
        cy.get('@postTransaction').then(pay, xhr => {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.response.body.transaction.description).to.equal('test_note')
            expect((xhr.response.body.transaction.amount) / 100).to.equal(pay)
        })
    })

    it.skip('Test2 (intercept API) -> mock response', () => {


        cy.wait('@getTransaction')
        cy.get('@getTransaction').then(xhr => {
            console.log(xhr)
            console.log(convertAmount(xhr.response.body.results[0].amount))
        })
    })


    it('Test3 (intercept API) -> router matcher', () => {

        const description = 'test_note'
        const pay = '102'
        cy.intercept('POST', '**/transactions', req => {

            req.reply(res => {
                expect(res.body.transaction.description).to.equal(description)
                req.body.description = 'TEST1234'
                res.body.transaction.description = "TEST123"
            })
        }).as('postTransaction')

        cy.contains('.MuiButton-label', 'New').click()
        cy.get('[data-test="main"]').find('.MuiPaper-rounded').then(search => {
            cy.wrap(search).find('#user-list-search-input').type('devon')
            cy.wrap(search).find('[data-test="users-list"]').each(item => {
                cy.wrap(item).contains('span', 'Devon Becker').click()
                cy.get('[class="MuiGrid-root MuiGrid-container MuiGrid-direction-xs-column MuiGrid-align-items-xs-center"]')
                    .find('[class="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary MuiTypography-gutterBottom"]')
                    .invoke('prop', 'innerText').should('contain', 'Devon Becker')
            })

            cy.get('#amount').type(pay)
            cy.get('#transaction-create-description-input').type(description)
            cy.contains('[data-test="transaction-create-submit-payment"]', 'Pay').click()



            cy.wait('@postTransaction')
            cy.get('@postTransaction').then(xhr => {
                cy.get('main').then(row => {
                    cy.wrap(row).find('div.MuiPaper-rounded').find('h2[class="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary MuiTypography-gutterBottom"]')
                        .eq(1).invoke('prop', 'innerText').should('contain', 'Paid $' + convertAmount(xhr.response.body.transaction.amount) + ' for ' + description)
                })
                console.log(xhr)
            })
        })
    })

    it('Test4 (request API) -> send request', () => {

        const transId = '183VHWyuQMS'
        const comment = 'comment12'

        cy.log('add like')
        cy.request({

            url: 'http://localhost:3001/likes/' + transId,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
            },
            body: `{"transactionId":"183VHWyuQMS"}`
        }).then(response => {
            expect(response.status).to.equal(200)
        })

        cy.log('add comment')
        cy.request({
            url: 'http://localhost:3001/comments/' + transId,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
            },
            body: `{"transactionId":"183VHWyuQMS","content":"${comment}"}`
        }).then(response => {
            expect(response.status).to.equal(200)
        })

        cy.request({
            url: 'http://localhost:3001/comments/' + transId,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            //console.log(response)
            const arr = response.body.comments
            expect(arr[arr.length - 1].content).to.equal(comment)

        })
    })
})

var convertAmount = function (amount) {
    var strArr = amount.toString().split('')
    if (strArr.length >= 3) {
        strArr[strArr.length - 3] = strArr[strArr.length - 3] + '.'
    }
    return strArr.join('')
}