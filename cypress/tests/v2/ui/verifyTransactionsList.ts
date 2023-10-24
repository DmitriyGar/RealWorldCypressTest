import { Pages } from "../../../support/pageObjects/Pages"
import { negativeOrPositiveAmountWrapper } from "../../../support/helpers/HelpMethods";
import testData from "../../../support/testData/testDataExistingUser.json"
import { StrictMode } from "react";


let pages = new Pages();


describe('Verify Home page', () => {

    beforeEach('Preconditions', () => {
        cy.visit('/')
        cy.loginUI(testData.userName,testData.password)
        pages.navigationMenu.openHomePage();
        cy.wait(1000)
    })




    it('Verify filtering of transactions by Amount range', () => {
        cy.log('filter between 100 and 130')
        pages.homePage.getAmountSlider().click({force: true})
        for(let i=0;i<4;i++)
        pages.homePage.getAmountSliderStartPoint().click(10, 0, { force: true })
        for(let i=0;i<31;i++)
        pages.homePage.getAmountSliderEndPoint().click(0, 10, { force: true })
        cy.wait(1000)
        pages.homePage.getTableTransactions().find('li div div div.MuiGrid-grid-sm-true').each(item =>{
            cy.wrap(item).find(':nth-child(2)').eq(3).find('span').then(price =>{
                let str=Number(price.text().slice(2))
                expect(str).greaterThan(100).and.lessThan(130)
            })
        })
    })

    it.only('Verify filtering between 450 and 520 then Clear filter', () => {
        cy.log('filter between 450 and 520')
        pages.homePage.getAmountSlider().click({force: true})
        for(let i=0;i<22;i++){
        pages.homePage.getAmountSliderStartPoint().click(10, 0, { force: true })
        }
        for(let i=0;i<16;i++)
        pages.homePage.getAmountSliderEndPoint().click(0, 7, { force: true })
        cy.wait(1000)
        pages.homePage.getTableTransactions().find('li div div div.MuiGrid-grid-sm-true').each(item =>{
            cy.wrap(item).find(':nth-child(2)').eq(3).find('span').then(price =>{
                let str=Number(price.text().slice(2))
                expect(str).greaterThan(450).and.lessThan(520)
                cy.get('[aria-label="grid"]').focus().scrollTo(0,128,{ensureScrollable: false})
            })
        })

        pages.homePage.getSliderScreenClearButton().click().wait(1000)
        pages.homePage.getSliderScreenLabel().should('contain','$0 - $1,000')
        pages.homePage.getTableTransactions().find('li div div div.MuiGrid-grid-sm-true').each(item =>{
            cy.wrap(item).find(':nth-child(2)').eq(3).find('span').then(price =>{
                let str=Number(price.text().slice(2))
                expect(str).greaterThan(0).and.lessThan(1000)
                cy.get('[aria-label="grid"]').focus().scrollTo(0,128,{ensureScrollable: false})
            })
        })
    })

})