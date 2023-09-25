

import { leftNavigationMenu } from "../../../support/pageObjects/NavigationMenu";
import { getElementsLeftNavMenu } from "../../../support/pageObjects/NavigationMenu";
import { homePage } from "../../../support/pageObjects/HomePage";



describe('Left navigation menu verification', () => {
    beforeEach('Open the app', () => {
        cy.clearAllCookies()
        cy.visit('/')
        cy.loginUI()
    })

    it('Verify user can show and hide left nav menu ', () => {

        leftNavigationMenu.getHideShowLeftNavMenuButton().click()
        leftNavigationMenu.checkLeftNavMenuState()
        leftNavigationMenu.getHideShowLeftNavMenuButton().click()
        leftNavigationMenu.checkLeftNavMenuState()

    })

    it('Verify user can navigate to all pages via left nav menu', () => {
        leftNavigationMenu.openMyAccountPage()
        cy.url().should('contain', '/user/settings')

        leftNavigationMenu.openHomePage()
        homePage.getEveryoneTab().should('contain', 'Everyone')
        homePage.getFriendsTab().should('contain','Friends')
        homePage.getMineTab().should('contain','Mine')

        leftNavigationMenu.openBankAccountsPage()
        cy.url().should('contain', '/bankaccounts')

        leftNavigationMenu.openNotificationsPage()
        cy.url().should('contain', '/notifications')
    })

    it('Verify UI elements on left navigation menu', () => {
        getElementsLeftNavMenu.profieIcon()
            .should('have.attr', 'src', 'https://cypress-realworld-app-svgs.s3.amazonaws.com/t45AiwidW.svg')
        getElementsLeftNavMenu.userName().should('contain', 'Katharina_Bernier')
        getElementsLeftNavMenu.firstName().should('contain', 'Edgar')
        getElementsLeftNavMenu.lastName().should('contain', 'J')
        getElementsLeftNavMenu.amount().should('not.be.empty')
        getElementsLeftNavMenu.accBalanceLabel()
            .should('contain', 'Account Balance')

    })

    after('Postconditions', () => {
        cy.log('Logout from the app')
        leftNavigationMenu.logout()
    })
})
