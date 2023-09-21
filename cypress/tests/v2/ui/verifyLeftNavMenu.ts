import { leftNavMenu } from "../../../support/pageObjects/NavMenu";


describe('Left navigation menu verification',()=>{
    beforeEach('Open the app',()=>{
    cy.visit('/')
    cy.login2()
    })

it('Verify left nav menu can be hidden', ()=>{
    cy.log('First test')
leftNavMenu.showHideMenu()
})

})
