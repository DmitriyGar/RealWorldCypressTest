import { Pages } from "../../../support/pageObjects/Pages"


let pages = new Pages();

describe('Verify Sign Up page', () => {
    beforeEach('Preconditions', () => {
        cy.visit('/')
        pages.signInPage.getDonthaveAnAccountLink().click()
        cy.wait(500)
    })

    it('Verify UI elements presence on Sign Up page', () => {
        pages.signUpPage.getLogo().should('be.visible')
        pages.signUpPage.getSignUpLabel().should('be.visible')
        pages.signUpPage.getUsernameLabel().should('be.visible')
        pages.signUpPage.getUsernameField().should('be.visible').and('be.empty')
        pages.signUpPage.getPasswordLabel().should('be.visible')
        pages.signUpPage.getPasswordField().should('be.visible').and('be.empty')
        pages.signUpPage.getHaveAnAccountLink().should('be.visible').invoke('attr', 'href').should('contain', '/signin')
        pages.signUpPage.getSignUpButton().should('be.visible')
        pages.signUpPage.getBuiltByLabel().should('be.visible')
        pages.signUpPage.getBuiltByCypressLogo().should('be.visible')
    })

})