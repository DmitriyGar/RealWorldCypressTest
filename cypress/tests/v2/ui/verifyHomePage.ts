import { HomePage, homePage } from "../../../support/pageObjects/HomePage"
import { leftNavigationMenu } from "../../../support/pageObjects/NavigationMenu"

describe('Verify Home page', () => {
    beforeEach('Preconditions', () => {
        cy.visit('/')
        cy.loginUI()
    })
    it.only('Verify UI elements presence on Home Page', () => {
        leftNavigationMenu.openHomePage();
        homePage.getSelectedTab().should('contain', 'Everyone')
        homePage.getEveryoneTab().should('be.visible')
        homePage.getEveryoneTab().should('contain', 'Everyone')
        homePage.getFriendsTab().should('be.visible')
        homePage.getFriendsTab().should('contain', 'Friends')
        homePage.getMineTab().should('be.visible')
        homePage.getMineTab().should('contain', 'Mine')
        homePage.getDatePicker().should('be.visible')
        homePage.getDatePicker().should('contain', 'ALL')
        homePage.getAmountSlider().should('be.visible')
        homePage.getAmountSlider().should('contain', 'Amount:')
    })

})