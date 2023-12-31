import { Pages } from "../../support/pageObjects/Pages"
import testData from "../../support/testData/testDataExistingUser.json"

let pages = new Pages();

describe('Left navigation menu verification', () => {
    beforeEach('Open the app', () => {
        cy.clearAllCookies()
        cy.visit('/')
        cy.loginUI()
    })

    it('Verify user can show and hide left nav menu ', () => {

        pages.navigationMenu.getHideShowLeftNavMenuButton().click()
        pages.navigationMenu.checkLeftNavMenuState()
        pages.navigationMenu.getHideShowLeftNavMenuButton().click()
        pages.navigationMenu.checkLeftNavMenuState()
    })

    it('Verify user can navigate to all pages via left nav menu', () => {
        pages.navigationMenu.openMyAccountPage()
        cy.url().should('contain', '/user/settings')

        pages.navigationMenu.openHomePage()
        pages.homePage.getEveryoneTab().should('contain', 'Everyone')
        pages.homePage.getFriendsTab().should('contain','Friends')
        pages.homePage.getMineTab().should('contain','Mine')

        pages.navigationMenu.openBankAccountsPage()
        cy.url().should('contain', '/bankaccounts')

        pages.navigationMenu.openNotificationsPage()
        cy.url().should('contain', '/notifications')
    })

    it('Verify UI elements presence on left navigation menu', () => {
        pages.navigationMenu.getProfieIcon()
            .should('have.attr', 'src', 'https://cypress-realworld-app-svgs.s3.amazonaws.com/t45AiwidW.svg')
            pages.navigationMenu.getUserName().should('contain', testData.userName)
            pages.navigationMenu.getFirstName().should('contain', testData.firstName)
            pages.navigationMenu.getLastName().should('contain', testData.lastName.charAt(0).toUpperCase())
            pages.navigationMenu.getAmount().should('not.be.empty')
            pages.navigationMenu.getAccBalanceLabel()
            .should('contain', 'Account Balance')

    })

    after('Postconditions', () => {
        cy.log('Logout from the app')
        pages.navigationMenu.logout()
    })
})
