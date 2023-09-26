import { Pages } from "../../../support/pageObjects/Pages"

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

    it.only('Verify transactions on Home Page', () => {

        pages.navigationMenu.openHomePage();
        
    var requestRun = function (){
        let n: number = 4;


        cy.request({
            url: 'http://localhost:3001/transactions/public',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            for (let n=0; n<response.body.results.length-1; n++){
                console.log(response.body.results[n])
            pages.homePage.getPaymentPriceTransactionValue(response.body.results[n].id).invoke('prop', 'innerText')
            .should('equal', negativeOrPositiveAmountWrapper(response.body.results[n].amount, response.body.results[n].requestStatus))
            if (n==response.body.results.length-2){
                cy.get('[aria-label="grid"]').focus().scrollTo("bottom")
                requestRun();
            }
            }
        }
        )
    }
    requestRun();
    })

})

var negativeOrPositiveAmountWrapper = (amount: string, status: string) => {
    let sign: string
    if (status == 'rejected') {
        sign = '+$' + amount
    } else {
        sign = '-$' + amount
    }
    return convertAmount(sign)
}

var convertAmount = function (amount: string) {
    var strArr = amount.toString().split('')
    if (strArr.length >= 3) {
        strArr[strArr.length - 3] = strArr[strArr.length - 3] + '.'
    }
    return strArr.join('')
}