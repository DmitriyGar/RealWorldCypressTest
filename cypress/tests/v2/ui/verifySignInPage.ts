import { Pages } from "../../../support/pageObjects/Pages"


let pages = new Pages();

describe('Verify Sign In page', () => {
    beforeEach('Preconditions', () => {
        cy.visit('/')
    })

    it('Verify UI elements presence on Sign In page', () => {
pages.signInPage.getLogo().should('be.visible')
pages.signInPage.getSignInLabel().should('be.visible')
pages.signInPage.getUsernameLabel().should('be.visible')
pages.signInPage.getUsernameField().should('be.visible').and('be.empty')
pages.signInPage.getPasswordLabel().should('be.visible')
pages.signInPage.getPasswordField().should('be.visible').and('be.empty')
pages.signInPage.getRememberMeCheckbox().should('not.be.checked')
pages.signInPage.getRememberMeLabel().should('be.visible')
pages.signInPage.getDonthaveAnAccountLink().should('be.visible').invoke('attr','href').should('contain','/signup')
pages.signInPage.getSignInButton().should('be.visible').and('be.enabled')
    })
})
