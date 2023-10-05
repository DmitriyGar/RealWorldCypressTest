import { Pages } from "../../../support/pageObjects/Pages";
import { ApiObjectBase } from "../../../support/apiObjects/apiObjectBase";
import testData from "../../../support/testData/testDataNewUser.json"

let pages = new Pages();
let apiObjectBase = new ApiObjectBase()

describe('Bank Account page verification', () => {

    beforeEach('Open the app', () => {
        cy.clearAllCookies()
        apiObjectBase.createUserAPI.createUserRequest(testData.userName + '07', testData.firstName, testData.lastName, testData.password)
        cy.visit('/')
        cy.loginUI(testData.userName + '07', testData.password)

        pages.homePageOnboardingScreen.getNextButton().click()
        pages.homePageOnboardingScreen.getBankNameField().clear().type(testData.bankAccountName)
        pages.homePageOnboardingScreen.getRoutingNumberField().clear().type(testData.routingNumber)
        pages.homePageOnboardingScreen.getAccountNumberField().clear().type(testData.AccountNumber)
        pages.homePageOnboardingScreen.getSaveButton().should('be.enabled').click()
        pages.homePageOnboardingScreen.getDoneButton().should('be.visible').and('contain', 'Done').click()
        pages.homePageOnboardingScreen.getDialogWindowSection().should('not.exist')
        pages.navigationMenu.openBankAccountsPage()
    })
    it.only('Verify UI elements on Bank Account screen', () => {
        pages.bankAccountPage.getTitle().should('contain', 'Bank Accounts')
        pages.bankAccountPage.getCreateButton().should('be.visible').invoke('prop','innerText').should('contain','CREATE')
       
        pages.bankAccountPage.getDeleteButton().should('be.visible').invoke('prop','innerText').should('contain','DELETE')
        pages.bankAccountPage.getBankAccountName().should('contain', testData.bankAccountName)
        /*
                    pages.homePageOnboardingScreen.getBankNameField().should('be.empty').invoke('attr', 'placeholder')
                        .should('contain', 'Bank Name')
                    pages.homePageOnboardingScreen.getRoutingNumberField().should('be.empty')
                        .invoke('attr', 'placeholder').should('contain', 'Routing Number')
                    pages.homePageOnboardingScreen.getAccountNumberField().should('be.empty')
                        .invoke('attr', 'placeholder').should('contain', 'Account Number')
                    pages.homePageOnboardingScreen.getSaveButton().should('be.visible')
                    */

    })
})