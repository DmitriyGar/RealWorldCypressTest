import { id } from "date-fns/locale";
import { ApiObjectBase } from "../../support/apiObjects/apiObjectBase"
import testData from "../../support/testData/testDataNewUser.json"

describe('Create account via API', () => {
    let apiObjectBase = new ApiObjectBase();

    it('Send request for creating user', () => {
        let postStr = '2'
        apiObjectBase.createUserAPI.createUserRequest(testData.userName + postStr, testData.firstName + postStr, testData.lastName + postStr, testData.password + postStr)
        apiObjectBase.loginUserAPI.loginAPI(testData.userName + postStr, testData.password + postStr)
    })

})
