import { CreateUserAPI } from "./createUser";
import { LoginUser } from "./loginUser";

export class ApiObjectBase {
    public createUserAPI:CreateUserAPI;
    public loginUserAPI:LoginUser;
    constructor (){
        this.createUserAPI = new CreateUserAPI()
        this.loginUserAPI = new LoginUser();
    }
}