import { Pages } from "../../../support/pageObjects/Pages";
import { ApiObjectBase } from "../../../support/apiObjects/apiObjectBase";
import testData from "../../../support/testData/testDataNewUser.json"

let pages = new Pages();
let apiObjectBase = new ApiObjectBase()

describe('Left navigation menu verification', () => {
    beforeEach('Open the app', () => {
        cy.clearAllCookies()
        apiObjectBase.createUserAPI.createUserRequest(testData.userName+'1', testData.firstName, testData.lastName, testData.password)
        cy.visit('/')
        cy.loginUI(testData.userName+'1', testData.password)

    })

    it('Verify UI elements presence on Onboarding screen 1', () => {
        pages.homePageOnboardingScreen.getDialogWindowSection().should('be.visible')
        pages.homePageOnboardingScreen.getOnboardingTitle().should('contain', 'Get Started with Real World App')
        pages.homePageOnboardingScreen.getOnboardingLogo().should('be.visible')
        pages.homePageOnboardingScreen.getOnboardingText().should('contain', 'Real World App requires a Bank Account to perform transactions.')
            .and('contain', 'Click').and('contain', 'Next').and('contain', 'to begin setup of your Bank Account.')
        pages.homePageOnboardingScreen.getOnboardingNextButton().should('be.visible')
    })

    it('Verif UI elements presence on Onboarding screen 2', () => {
        pages.homePageOnboardingScreen.getOnboardingNextButton().click()
        pages.homePageOnboardingScreen.getBankNameField().should('be.empty').invoke('attr', 'placeholder')
            .should('contain', 'Bank Name')
        pages.homePageOnboardingScreen.getRoutingNumberField().should('be.empty')
            .invoke('attr', 'placeholder').should('contain', 'Routing Number')
        pages.homePageOnboardingScreen.getAccountNumberField().should('be.empty')
            .invoke('attr', 'placeholder').should('contain', 'Account Number')
        pages.homePageOnboardingScreen.getSaveButton().should('be.visible')
    })

    it('Verify negative fields validation of Bank Account field on Onboarding screen 2', () => {
        pages.homePageOnboardingScreen.getOnboardingNextButton().click()
        pages.homePageOnboardingScreen.getBankNameField().focus()
        pages.homePageOnboardingScreen.getSaveButton().click()
        pages.homePageOnboardingScreen.getBankNameFieldError().should('be.visible').and('contain','Enter a bank name')
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')

        pages.homePageOnboardingScreen.getAccountNumberField().type('123456789012')
        pages.homePageOnboardingScreen.getRoutingNumberField().clear().type('123456789')
        pages.homePageOnboardingScreen.getBankNameField().type('1234')
        pages.homePageOnboardingScreen.getBankNameFieldError().should('be.visible').and('contain','Must contain at least 5 characters')
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')

        pages.homePageOnboardingScreen.getBankNameField().clear().type('12345')
        pages.homePageOnboardingScreen.getBankNameFieldError().should('not.exist')
        pages.homePageOnboardingScreen.getBankNameField().clear()
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')

    })

    it('Verify negative fields validation of Routing Number field on Onboarding screen 2', () => {
        pages.homePageOnboardingScreen.getOnboardingNextButton().click()
        pages.homePageOnboardingScreen.getRoutingNumberField().focus()
        pages.homePageOnboardingScreen.getSaveButton().click()
        pages.homePageOnboardingScreen.getRoutingNumberFieldError().should('be.visible').and('contain','Enter a valid bank routing number')
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')

        pages.homePageOnboardingScreen.getBankNameField().clear().type('12345')
        pages.homePageOnboardingScreen.getAccountNumberField().type('123456789012')
        pages.homePageOnboardingScreen.getRoutingNumberField().type('1')
        pages.homePageOnboardingScreen.getRoutingNumberFieldError().should('be.visible').and('contain','Must contain a valid routing number')
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')

        pages.homePageOnboardingScreen.getRoutingNumberField().clear().type('12345678')
        pages.homePageOnboardingScreen.getRoutingNumberFieldError().should('be.visible').and('contain','Must contain a valid routing number')
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')

        pages.homePageOnboardingScreen.getRoutingNumberField().clear().type('1234567890')
        pages.homePageOnboardingScreen.getRoutingNumberFieldError().should('be.visible').and('contain','Must contain a valid routing number')
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')

        pages.homePageOnboardingScreen.getRoutingNumberField().clear().type('123456789')
        pages.homePageOnboardingScreen.getRoutingNumberFieldError().should('not.exist')

        pages.homePageOnboardingScreen.getRoutingNumberField().clear()
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')
    })

    it('Verify negative fields validation of Account Number field on Onboarding screen 2', () => {
        pages.homePageOnboardingScreen.getOnboardingNextButton().click()
        pages.homePageOnboardingScreen.getAccountNumberField().focus()
        pages.homePageOnboardingScreen.getBankNameField().focus()
        pages.homePageOnboardingScreen.getAccountNumberFieldError().should('be.visible').and('contain','Enter a valid bank account number')
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')

        pages.homePageOnboardingScreen.getBankNameField().clear().type('12345')
        pages.homePageOnboardingScreen.getRoutingNumberField().clear().type('123456789')
        pages.homePageOnboardingScreen.getAccountNumberField().type('1')
        pages.homePageOnboardingScreen.getAccountNumberFieldError().should('be.visible').and('contain','Must contain at least 9 digits')
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')

        pages.homePageOnboardingScreen.getAccountNumberField().clear().type('12345678')
        pages.homePageOnboardingScreen.getAccountNumberFieldError().should('be.visible').and('contain','Must contain at least 9 digits')
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')
        pages.homePageOnboardingScreen.getAccountNumberField().clear().type('123456789012')
        pages.homePageOnboardingScreen.getAccountNumberFieldError().should('not.exist')

        pages.homePageOnboardingScreen.getAccountNumberField().clear().type('1234567890123')
        pages.homePageOnboardingScreen.getAccountNumberFieldError().should('be.visible').and('contain','Must contain no more than 12 digits')
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')

        pages.homePageOnboardingScreen.getAccountNumberField().clear()
        pages.homePageOnboardingScreen.getAccountNumberFieldError().should('be.visible').and('contain','Enter a valid bank account number')
        pages.homePageOnboardingScreen.getSaveButton().should('be.disabled')

    })

    it('Verify positive fields validation with MIN length data on Onboarding screen 2', () => {
        pages.homePageOnboardingScreen.getOnboardingNextButton().click()
        pages.homePageOnboardingScreen.getBankNameField().clear().type('1@aC5')
        pages.homePageOnboardingScreen.getBankNameFieldError().should('not.exist')

        pages.homePageOnboardingScreen.getRoutingNumberField().clear().type('1#34a67S0')
        pages.homePageOnboardingScreen.getRoutingNumberFieldError().should('not.exist')

        pages.homePageOnboardingScreen.getAccountNumberField().clear().type('1@345%7f9')
        pages.homePageOnboardingScreen.getAccountNumberFieldError().should('not.exist')
        pages.homePageOnboardingScreen.getSaveButton().should('be.enabled')
    })

    it('Verify positive fields validation with MAX length data on Onboarding screen 2', () => {
        pages.homePageOnboardingScreen.getOnboardingNextButton().click()
        pages.homePageOnboardingScreen.getBankNameField().clear().type('1@aC5 N@me 1234567890 account')
        pages.homePageOnboardingScreen.getBankNameFieldError().should('not.exist')

        pages.homePageOnboardingScreen.getRoutingNumberField().clear().type('1#34a67S0')
        pages.homePageOnboardingScreen.getRoutingNumberFieldError().should('not.exist')

        pages.homePageOnboardingScreen.getAccountNumberField().clear().type('1@345%7f9A12')
        pages.homePageOnboardingScreen.getAccountNumberFieldError().should('not.exist')
        pages.homePageOnboardingScreen.getSaveButton().should('be.enabled')
    })

    it.only('Verify Bank Account creation via Onboarding screen', () => {
        pages.homePageOnboardingScreen.getOnboardingNextButton().click()
        pages.homePageOnboardingScreen.getBankNameField().clear().type('Bank Account #1')

        pages.homePageOnboardingScreen.getRoutingNumberField().clear().type('123456789')
        pages.homePageOnboardingScreen.getRoutingNumberFieldError().should('not.exist')

        pages.homePageOnboardingScreen.getAccountNumberField().clear().type('123456789012')
        pages.homePageOnboardingScreen.getAccountNumberFieldError().should('not.exist')
        pages.homePageOnboardingScreen.getSaveButton().should('be.enabled').click()

        pages.homePageOnboardingScreen.getOnboardingTitle().should('contain','Finished')
        pages.homePageOnboardingScreen.getOnboardingLogo().should('be.visible')
        pages.homePageOnboardingScreen.getOnboardingText().should('contain', 'You\'re all set!')
            .and('contain', 'We\'re excited to have you aboard the Real World App!')
        pages.homePageOnboardingScreen.getOnboardingNextButton().should('be.visible').and('contain','DONE').click()
    })
})