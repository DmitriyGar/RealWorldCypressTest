import { Pages } from "../../../support/pageObjects/Pages"


let pages = new Pages();

describe('Verify Sign Up page:', () => {
    beforeEach('Preconditions', () => {
        cy.visit('/')
        pages.signInPage.getDonthaveAnAccountLink().click()
        pages.signUpPage.getSignUpLabel().should('be.visible')
        cy.wait(500)
    })

    it('Verify UI elements presence on Sign Up page', () => {
        pages.signUpPage.getLogo().should('be.visible')
        pages.signUpPage.getSignUpLabel().should('be.visible')
        pages.signUpPage.getFirstNameLabel().should('be.visible').and('contain', 'First Name')
        pages.signUpPage.getFirstNameField().should('be.visible').and('be.empty')
        pages.signUpPage.getLastNameLabel().should('be.visible').and('contain', 'Last Name')
        pages.signUpPage.getLastNameField().should('be.visible').and('be.empty')
        pages.signUpPage.getUsernameLabel().should('be.visible').and('contain', 'Username')
        pages.signUpPage.getUsernameField().should('be.visible').and('be.empty')
        pages.signUpPage.getPasswordLabel().should('be.visible').and('contain', 'Password')
        pages.signUpPage.getPasswordField().should('be.visible').and('be.empty')
        pages.signUpPage.getConfirmPasswordLabel().should('be.visible').and('contain', 'Confirm Password')
        pages.signUpPage.getConfirmPasswordField().should('be.visible').and('be.empty')
        pages.signUpPage.getHaveAnAccountLink().should('be.visible').invoke('attr', 'href').should('contain', '/signin')
        pages.signUpPage.getSignUpButton().should('be.visible')
        pages.signUpPage.getBuiltByLabel().should('be.visible')
        pages.signUpPage.getBuiltByCypressLogo().should('be.visible')
    })

    it('Verify negative fields validation - first name is empty', () => {
        pages.signUpPage.getLastNameField().type('test')
        pages.signUpPage.getUsernameField().type('test')
        pages.signUpPage.getPasswordField().type('test')
        pages.signUpPage.getConfirmPasswordField().type('test')
        pages.signUpPage.getSignUpButton().should('be.disabled')
    })

    it('Verify negative fields validation - last name is empty', () => {
        pages.signUpPage.getFirstNameField().type('test')
        pages.signUpPage.getUsernameField().type('test')
        pages.signUpPage.getPasswordField().type('test')
        pages.signUpPage.getConfirmPasswordField().type('test')
        pages.signUpPage.getSignUpButton().should('be.disabled')
    })

    it('Verify negative fields validation - username is empty', () => {
        pages.signUpPage.getFirstNameField().type('test')
        pages.signUpPage.getLastNameField().type('test')
        pages.signUpPage.getPasswordField().type('test')
        pages.signUpPage.getConfirmPasswordField().type('test')
        pages.signUpPage.getSignUpButton().should('be.disabled')
    })

    it('Verify negative fields validation - confirm password is empty', () => {
        pages.signUpPage.getFirstNameField().type('test')
        pages.signUpPage.getLastNameField().type('test')
        pages.signUpPage.getUsernameField().type('test')
        pages.signUpPage.getPasswordField().type('test')
        pages.signUpPage.getSignUpButton().should('be.disabled')
    })

    it('Verify negative fields validation - password is empty', () => {
        pages.signUpPage.getFirstNameField().type('test')
        pages.signUpPage.getLastNameField().type('test')
        pages.signUpPage.getUsernameField().type('test')
        pages.signUpPage.getPasswordField().type('test')
        pages.signUpPage.getConfirmPasswordField().type('test')
        pages.signUpPage.getPasswordField().clear()
        pages.signUpPage.getSignUpButton().should('be.disabled')
        pages.signUpPage.getPasswordError().should('contain', 'Enter your password')
        pages.signUpPage.getConfirmPasswordError().should('contain', 'Password does not match')
    })


    it('Verify negative fields validation - password does not math confirm password', () => {
        pages.signUpPage.getFirstNameField().type('test')
        pages.signUpPage.getLastNameField().type('test')
        pages.signUpPage.getUsernameField().type('test')
        pages.signUpPage.getPasswordField().type('test')
        pages.signUpPage.getPasswordField().type('Test')
        pages.signUpPage.getConfirmPasswordField().type('test')
        pages.signUpPage.getConfirmPasswordError().should('contain', 'Password does not match')
    })

    it('Verify negative fields validation - password limitation', () => {
        pages.signUpPage.getFirstNameField().type('test')
        pages.signUpPage.getLastNameField().type('test')
        pages.signUpPage.getUsernameField().type('test')
        pages.signUpPage.getConfirmPasswordField().type('tes')
        pages.signUpPage.getPasswordField().type('tes')
        pages.signUpPage.getPasswordError().should('contain', 'Password must contain at least 4 characters')
        pages.signUpPage.getSignUpButton().should('be.disabled')
    })

    it('Verify positive fields validation - all fields are filled with MAX limitation of valid data including digits, alphabetical and special characters', () => {
        pages.signUpPage.getFirstNameField().type('QWERTYtest1~!@#$%^&*()_+')
        pages.signUpPage.getLastNameField().type('QWERTYtest1~!@#$%^&*()_+')
        pages.signUpPage.getUsernameField().type('QWERTYtest1~!@#$%^&*()_+')
        pages.signUpPage.getPasswordField().type('QWERTYtest1~!@#$%^&*()_+')
        pages.signUpPage.getConfirmPasswordField().type('QWERTYtest1~!@#$%^&*()_+')
        pages.signUpPage.getFirstNameError().should('not.exist')
        pages.signUpPage.getLastNameError().should('not.exist')
        pages.signUpPage.getUsernameError().should('not.exist')
        pages.signUpPage.getPasswordError().should('not.exist')
        pages.signUpPage.getConfirmPasswordError().should('not.exist')
        pages.signUpPage.getSignUpButton().should('be.enabled')
    })

    it('Verify positive fields validation - all fields are filled with MIN limitation of valid data', () => {
        pages.signUpPage.getFirstNameField().type('t')
        pages.signUpPage.getLastNameField().type('T')
        pages.signUpPage.getUsernameField().type('t')
        pages.signUpPage.getPasswordField().type('test')
        pages.signUpPage.getConfirmPasswordField().type('test')
        pages.signUpPage.getFirstNameError().should('not.exist')
        pages.signUpPage.getLastNameError().should('not.exist')
        pages.signUpPage.getUsernameError().should('not.exist')
        pages.signUpPage.getPasswordError().should('not.exist')
        pages.signUpPage.getConfirmPasswordError().should('not.exist')
        pages.signUpPage.getSignUpButton().should('be.enabled')
    })

    it.only('Verify user can sign up to the app', () => {
        pages.signUpPage.getFirstNameField().type('testf1')
        pages.signUpPage.getLastNameField().type('testl1')
        pages.signUpPage.getUsernameField().type('testu1')
        pages.signUpPage.getPasswordField().type('test1')
        pages.signUpPage.getConfirmPasswordField().type('test1')
        pages.signUpPage.getSignUpButton().should('be.enabled').click()
    })
})