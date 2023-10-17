import { Pages } from "../../../support/pageObjects/Pages";
import { ApiObjectBase } from "../../../support/apiObjects/apiObjectBase";
import testData from "../../../support/testData/testDataNewUser.json"
import { forEach } from "lodash";

let pages = new Pages();
let apiObjectBase = new ApiObjectBase()

describe('Bank Account page verification', () => {

    beforeEach('Open the app', () => {
        //Math.floor(Math.random() * (max - min + 1)) + min;
        let randomNumber = (Math.random()*(10000-2+1)+2).toFixed(5)
        cy.clearAllCookies()
        apiObjectBase.createUserAPI.createUserRequest(testData.userName + randomNumber, testData.firstName, testData.lastName, testData.password)
        cy.visit('/')
        cy.loginUI(testData.userName + randomNumber, testData.password)
        cy.log('Add bank account on Onboarding screen')
        pages.homePageOnboardingScreen.getNextButton().click()
        pages.homePageOnboardingScreen.getBankNameField().clear().type(testData.bankAccountName + '1')
        pages.homePageOnboardingScreen.getRoutingNumberField().clear().type(testData.routingNumber)
        pages.homePageOnboardingScreen.getAccountNumberField().clear().type(testData.AccountNumber)
        pages.homePageOnboardingScreen.getSaveButton().should('be.enabled').click()
        pages.homePageOnboardingScreen.getDoneButton().should('be.visible').and('contain', 'Done').click()
        pages.homePageOnboardingScreen.getDialogWindowSection().should('not.exist')

        pages.navigationMenu.openBankAccountsPage()
    })

    it('Verify UI elements on Bank Account screen', () => {
        pages.bankAccountPage.getTitle().should('contain', 'Bank Accounts')
        pages.bankAccountPage.getCreateButton().should('be.visible').invoke('prop', 'innerText').should('contain', 'CREATE')
        pages.bankAccountPage.getDeleteButton().should('be.visible').invoke('prop', 'innerText').should('contain', 'DELETE')
        pages.bankAccountPage.getBankAccountName().should('contain', testData.bankAccountName + '1')

    })

    it('Verify adding a few new bank accounts on Bank Account screen', () => {
        cy.log('Add one more bank account')
        pages.bankAccountPage.getCreateButton().click()
        pages.bankAccountPage.getBankNameField().type(testData.bankAccountName + '2')
        pages.bankAccountPage.getRoutingNumberField().type('000000002')
        pages.bankAccountPage.getAccountNumberField().type('000000000002')
        pages.bankAccountPage.getNewBankAccountSaveButton().click()
        cy.log('Add one more bank account')
        pages.bankAccountPage.getCreateButton().click()
        pages.bankAccountPage.getBankNameField().type(testData.bankAccountName + '3')
        pages.bankAccountPage.getRoutingNumberField().type('000000003')
        pages.bankAccountPage.getAccountNumberField().type('000000000003')
        pages.bankAccountPage.getNewBankAccountSaveButton().click()
        cy.wait(500)
        cy.log('Verify added bank accounts')
        cy.get('[data-test="bankaccount-list"] li').each((name) => {
            cy.wrap(name).find('div div p').should('contain', testData.bankAccountName)
            cy.wrap(name).find('div div button').should('be.visible').and('contain', 'Delete')

        })
    })

    it('Verify deleting bank accounts on Bank Account screen', () => {
        cy.log('Add one more bank account')
        pages.bankAccountPage.getCreateButton().click()
        pages.bankAccountPage.getBankNameField().type(testData.bankAccountName + '2')
        pages.bankAccountPage.getRoutingNumberField().type('000000002')
        pages.bankAccountPage.getAccountNumberField().type('000000000002')
        pages.bankAccountPage.getNewBankAccountSaveButton().click()
        cy.log('Add one more bank account')
        pages.bankAccountPage.getCreateButton().click()
        pages.bankAccountPage.getBankNameField().type(testData.bankAccountName + '3')
        pages.bankAccountPage.getRoutingNumberField().type('000000003')
        pages.bankAccountPage.getAccountNumberField().type('000000000003')
        pages.bankAccountPage.getNewBankAccountSaveButton().click()
        cy.wait(500)
        cy.log('Delete bank account')
        cy.get('[data-test="bankaccount-list"] li').each( (row) => {
            cy.wrap(row).find('div div p').then((item) => {
                if (item.text().trim() == (testData.bankAccountName+'2')) {
                    cy.wrap(row).find('div div button').click().should('not.exist')
                    cy.wrap(row).find('div div p').should('contain', testData.bankAccountName+'2').and('contain', 'Deleted')
                } else {
                    cy.wrap(row).find('div div button').should('be.visible')
                    cy.wrap(row).find('div div p').should('not.contain', 'Deleted')
                }
            })
        })
       
    
    })
})