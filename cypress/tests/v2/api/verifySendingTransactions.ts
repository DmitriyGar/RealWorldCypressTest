import { ApiObjectBase } from "../../../support/apiObjects/apiObjectBase"
import testData from "../../../support/testData/testDataNewUser.json"
import * as apiHelpers from "../../../support/helpers/v2/api/apiHelpers"
import * as helpers from "../../../support/helpers/v2/ui/verifyHomePage.helper"

describe('Create account via API', () => {
    let apiObjectBase = new ApiObjectBase();

    it('Create two users then send and request transactions User1 -> User2 / User2 -> User1', () => {

        let postFixName1 = (new Date().toISOString()).slice(14).split('').filter(a=> !['.',':','Z'].includes(a)).join('') + '1';
        let postFixName2 = (new Date().toISOString()).slice(14).split('').filter(a=> !['.',':','Z'].includes(a)).join('') + '2';
        let amountUser1ToUser2=2100;
        let amountUser2ToUser1=1100;
        apiObjectBase.createUserAPI.createUserRequest(testData.userName + postFixName1, testData.firstName + postFixName1, testData.lastName + postFixName1, testData.password)
        apiObjectBase.createUserAPI.createUserRequest(testData.userName + postFixName2, testData.firstName + postFixName2, testData.lastName + postFixName2, testData.password)
        apiHelpers.sendTransactionsBetweenUsersAPI(testData.userName + postFixName1, testData.firstName + postFixName2, ''+amountUser1ToUser2, 'test1')
        apiHelpers.requestTransactionsBetweenUsersAPI(testData.userName + postFixName2, testData.firstName + postFixName1, ''+amountUser1ToUser2, 'test2')
        apiHelpers.sendTransactionsBetweenUsersAPI(testData.userName + postFixName2, testData.firstName + postFixName1, ''+amountUser2ToUser1, 'test2')
        apiHelpers.requestTransactionsBetweenUsersAPI(testData.userName + postFixName1, testData.firstName + postFixName2, ''+amountUser2ToUser1, 'test1')

        apiObjectBase.loginUserAPI.loginAPI(testData.userName + postFixName1, testData.password).then(user=>{
            expect(helpers.convertAmount(user.balance)).equal(amountUser2ToUser1+'.00')
        })

        apiObjectBase.loginUserAPI.loginAPI(testData.userName + postFixName2, testData.password).then(user=>{
            expect(helpers.convertAmount(user.balance)).equal(amountUser1ToUser2-amountUser2ToUser1+'.00')
        })
    })

    

})
