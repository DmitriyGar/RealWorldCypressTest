import { leftNavigationMenu } from "../../../support/pageObjects/NavigationMenu";


describe('Left navigation menu verification', () => {
    beforeEach('Open the app', () => {
        cy.visit('/')
        cy.loginUI()
    })

    it('Verify user can show and hide left nav menu ', () => {
        cy.log('Show and hide menu')
        leftNavigationMenu.hideShowMenu()
    })

    it('Verify user can navigate to pages via left nav menu', () => {
        cy.log('Open \"My Account\" page')
        leftNavigationMenu.openMyAccountPage()
  
        cy.log('Open \"Home\" page')
        leftNavigationMenu.openHomePage()
    
   
        cy.log('Open \"Bank Accounts\" page')
        leftNavigationMenu.openBankAccountsPage()
   
        cy.log('Open \"Notifications\" page')
        leftNavigationMenu.openNotificationsPage()
    })

    it.only('Verify UI elements on left navigation menu', ()=>{
        leftNavigationMenu.checkUIElementsOnLeftNavMenu()
    })
    
after('Postconditions',()=>{
    cy.log('Logout from the app')
    leftNavigationMenu.logout()
})
})
