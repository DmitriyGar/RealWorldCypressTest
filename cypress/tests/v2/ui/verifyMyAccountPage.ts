import { Pages } from "../../../support/pageObjects/Pages";
import { ApiObjectBase } from "../../../support/apiObjects/apiObjectBase";
import testData from "../../../support/testData/testDataExistingUser.json"


let pages = new Pages();
let apiObjectBase = new ApiObjectBase()

describe('My Account page verification', () => {

    beforeEach('Open the app', () => {
       
        cy.visit('/')
        cy.loginUI(testData.userName, testData.password)

        pages.navigationMenu.openMyAccountPage()
    })

    it('Verify UI elements on My Account page', () => {
        pages.myAccountPage.getTitle().should('contain', 'User Settings')
        pages.myAccountPage.getImage().should('be.visible')
        pages.myAccountPage.getSaveButton().should('be.visible').invoke('prop', 'innerText').should('contain', 'SAVE')
        pages.myAccountPage.getFirstNameField().should('be.visible')
        pages.myAccountPage.getLastNameField().should('be.visible')
        pages.myAccountPage.getEmailField().should('be.visible')
        pages.myAccountPage.getPhoneNumberField().should('be.visible')
    })

    it('Verify fields are filled with valid data',()=>{
        pages.myAccountPage.getFirstNameField().invoke('attr','value').should('contain',testData.firstName)
        pages.myAccountPage.getLastNameField().invoke('attr','value').should('contain',testData.lastName)
        pages.myAccountPage.getEmailField().invoke('attr','value').should('contain',testData.email)
        pages.myAccountPage.getPhoneNumberField().invoke('attr','value').should('contain',testData.phoneNumber)
        pages.myAccountPage.getSaveButton().should('be.enabled')
    })

    it('Verify Negative fields validation on My Account screen', () => {
        cy.log('Check first name field')
        pages.myAccountPage.getFirstNameField().clear()
        pages.myAccountPage.getFirstNameErrorMsg().should('be.visible').and('contain','Enter a first name')
        pages.myAccountPage.getSaveButton().should('be.disabled')
        cy.log('Check last name field')
        pages.myAccountPage.getFirstNameField().type(testData.firstName)
        pages.myAccountPage.getFirstNameErrorMsg().should('not.exist')
        pages.myAccountPage.getSaveButton().should('be.enabled')
        pages.myAccountPage.getLastNameField().clear()
        pages.myAccountPage.getLastNameErrorMsg().should('be.visible').and('contain','Enter a last name')
        pages.myAccountPage.getSaveButton().should('be.disabled')
        cy.log('Check email field')
        pages.myAccountPage.getLastNameField().type(testData.lastName)
        pages.myAccountPage.getLastNameErrorMsg().should('not.exist')
        pages.myAccountPage.getSaveButton().should('be.enabled')
        pages.myAccountPage.getEmailField().clear()
        pages.myAccountPage.getEmailErrorMsg().should('be.visible').and('contain','Enter an email address')
        pages.myAccountPage.getSaveButton().should('be.disabled')
        pages.myAccountPage.getEmailField().type('email')
        pages.myAccountPage.getEmailErrorMsg().should('be.visible').and('contain','Must contain a valid email address')
        pages.myAccountPage.getSaveButton().should('be.disabled')
        cy.log('Check phone number field')
        pages.myAccountPage.getEmailField().type(testData.email)
        pages.myAccountPage.getEmailErrorMsg().should('not.exist')
        pages.myAccountPage.getSaveButton().should('be.enabled')
        pages.myAccountPage.getPhoneNumberField().clear()
        pages.myAccountPage.getPhoneNumberErrorMsg().should('be.visible').and('contain','Enter a phone number')
        pages.myAccountPage.getSaveButton().should('be.disabled')
        pages.myAccountPage.getPhoneNumberField().type('p$1000')
        pages.myAccountPage.getPhoneNumberErrorMsg().should('be.visible').and('contain','Phone number is not valid')
        pages.myAccountPage.getSaveButton().should('be.disabled')
        pages.myAccountPage.getPhoneNumberField().clear()
        pages.myAccountPage.getPhoneNumberField().type('12345')
        pages.myAccountPage.getPhoneNumberErrorMsg().should('be.visible').and('contain','Phone number is not valid')
        pages.myAccountPage.getSaveButton().should('be.disabled')

    })

    it('Verify Positive fields validation on My Account screen', () => {
        cy.log('Check first name field')
        pages.myAccountPage.getFirstNameField().clear()
        pages.myAccountPage.getFirstNameField().type('max length name long string 1 @ _^&')
        pages.myAccountPage.getFirstNameErrorMsg().should('not.exist')
        pages.myAccountPage.getSaveButton().should('be.enabled')
        cy.log('Check last name field')
        pages.myAccountPage.getLastNameField().clear()
        pages.myAccountPage.getLastNameField().type('max length name long string 1 @ _^&')
        pages.myAccountPage.getLastNameErrorMsg().should('not.exist')
        pages.myAccountPage.getSaveButton().should('be.enabled')

        cy.log('Check email field')
        pages.myAccountPage.getEmailField().clear()
        pages.myAccountPage.getEmailField().type('email_bigEmailEnterTest1234567890Andmore@Email123456789Email.com')
        pages.myAccountPage.getEmailErrorMsg().should('not.exist')
        pages.myAccountPage.getSaveButton().should('be.enabled')

        cy.log('Check phone number field')
        pages.myAccountPage.getPhoneNumberField().clear()
        pages.myAccountPage.getPhoneNumberField().type('555-1234')
        pages.myAccountPage.getPhoneNumberErrorMsg().should('not.exist')
        pages.myAccountPage.getSaveButton().should('be.enabled')
        pages.myAccountPage.getPhoneNumberField().clear()
        pages.myAccountPage.getPhoneNumberField().type('123456')
        pages.myAccountPage.getPhoneNumberErrorMsg().should('not.exist')
        pages.myAccountPage.getSaveButton().should('be.enabled')
        pages.myAccountPage.getPhoneNumberField().clear()
        pages.myAccountPage.getPhoneNumberField().type('12345678901234567890')
        pages.myAccountPage.getPhoneNumberErrorMsg().should('not.exist')
        pages.myAccountPage.getSaveButton().should('be.enabled')
    })

    it.only('Verify updating data on My Account screen', () => {
        cy.log('Update first name field')
        pages.myAccountPage.getFirstNameField().clear()
        pages.myAccountPage.getFirstNameField().type(testData.firstName+'1')
        pages.myAccountPage.getSaveButton().click()
        cy.wait(500)
        cy.reload()
        pages.myAccountPage.getFirstNameField().invoke('attr','value').should('contain',testData.firstName+'1')
        pages.navigationMenu.getFirstName().should('contain',testData.firstName+'1')

        cy.log('Update last name field')
        pages.myAccountPage.getLastNameField().clear()
        pages.myAccountPage.getLastNameField().type(testData.lastName+'1')
        pages.myAccountPage.getSaveButton().click()
        cy.wait(500)
        cy.reload()
        pages.myAccountPage.getLastNameField().invoke('attr','value').should('contain',testData.lastName+'1')
      
        cy.log('Update email field')
        pages.myAccountPage.getEmailField().clear()
        pages.myAccountPage.getEmailField().type(testData.email+'w')
        pages.myAccountPage.getSaveButton().click()
        cy.wait(500)
        cy.reload()
        pages.myAccountPage.getEmailField().invoke('attr','value').should('contain',testData.email+'w')
       
        cy.log('Update phone number field')
        pages.myAccountPage.getPhoneNumberField().clear()
        pages.myAccountPage.getPhoneNumberField().type((testData.phoneNumber).replace('1','5'))
        pages.myAccountPage.getSaveButton().click()
        cy.wait(500)
        cy.reload()
        pages.myAccountPage.getPhoneNumberField().invoke('attr','value').should('contain',(testData.phoneNumber).replace('1','5'))
    })
})
