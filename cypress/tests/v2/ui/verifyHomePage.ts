import { Pages } from "../../../support/pageObjects/Pages"
import { negativeOrPositiveAmountWrapper } from "../../../support/helpers/HelpMethods";

let pages = new Pages();

describe('Verify Home page', () => {
    beforeEach('Preconditions', () => {
        cy.visit('/')
        cy.loginUI()
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

    it.only('Verify transactions on Home Page match API', () => {

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

})

