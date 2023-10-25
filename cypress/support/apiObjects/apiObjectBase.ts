import { CreateUserAPI } from "./createUser";
import { LoginUser } from "./loginUser";
import { SendGetTransactions } from "./sendGetTransactions";
import { SearchTransactions } from "./searchTransactions";

export class ApiObjectBase {
    public createUserAPI:CreateUserAPI;
    public loginUserAPI:LoginUser;
    public sendGetTransactions:SendGetTransactions;
    public searchTransactions:SearchTransactions;
    constructor (){
        this.createUserAPI = new CreateUserAPI()
        this.loginUserAPI = new LoginUser();
        this.searchTransactions = new SearchTransactions();
        this.sendGetTransactions = new SendGetTransactions();
    }
}