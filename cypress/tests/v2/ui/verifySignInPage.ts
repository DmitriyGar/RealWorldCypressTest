import { Pages } from "../../../support/pageObjects/Pages"
import testData from "../../../support/testData/testDataExistingUser.json"


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
        pages.signInPage.getDonthaveAnAccountLink().should('be.visible').invoke('attr', 'href').should('contain', '/signup')
        pages.signInPage.getSignInButton().should('be.visible')
        pages.signInPage.getBuiltByLabel().should('be.visible')
        pages.signInPage.getBuiltByCypressLogo().should('be.visible')
    })

    it('Verify validation rules on Sign In page', () => {
        pages.signInPage.getSignInButton().click()
        pages.signInPage.getUsernameError().should('contain', 'Username is required')
        pages.signInPage.getSignInButton().should('be.disabled')
        pages.signInPage.getUsernameField().type('some_username')
        pages.signInPage.getSignInButton().should('be.disabled')
        pages.signInPage.getPasswordField().type('1')
        pages.signInPage.getPasswordError().should('contain', 'Password must contain at least 4 characters')
        pages.signInPage.getSignInButton().should('be.disabled')
        pages.signInPage.getPasswordField().type('123456789')
        pages.signInPage.getSignInButton().click()
        pages.signInPage.getSigninError().should('contain', 'Username or password is invalid')
    })

    it('Verify user can login to the app via Sign In page without Remember Me', () => {
        pages.signInPage.getUsernameField().type(testData.userName)
        pages.signInPage.getPasswordField().type(testData.password)
        pages.signInPage.getSignInButton().should('be.enabled')
        pages.signInPage.getSignInButton().click()
        pages.navigationMenu.getUserName().should('contain', testData.userName).then(check => {
            expect(localStorage.getItem('authState')).to.contain('\"value\":\"authorized\"')
        })
    })

    it('Verify user can login to the app via Sign In page with Remember Me', () => {
        pages.signInPage.getUsernameField().type(testData.userName)
        pages.signInPage.getPasswordField().type(testData.password)
        pages.signInPage.getRememberMeCheckbox().click()
        pages.signInPage.getSignInButton().should('be.enabled')
        pages.signInPage.getSignInButton().click()
        pages.navigationMenu.getUserName().should('contain', testData.userName).then(check => {
            expect(localStorage.getItem('authState')).to.contain('\"value\":\"authorized\"')
        })
    })

})
