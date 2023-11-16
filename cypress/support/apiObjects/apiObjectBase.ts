import { CreateUserAPI } from "./createUser";
import { LoginUser } from "./loginUser";
import { SendGetTransactions } from "./sendGetTransactions";
import { SearchTransactions } from "./searchTransactions";
import { addBankAccountAPI } from "./addBankAccount";

export class ApiObjectBase {
    public createUserAPI:CreateUserAPI;
    public loginUserAPI:LoginUser;
    public sendGetTransactions:SendGetTransactions;
    public searchTransactions:SearchTransactions;
    public addBankAccount:addBankAccountAPI;
    
    constructor (){
        this.createUserAPI = new CreateUserAPI()
        this.loginUserAPI = new LoginUser();
        this.searchTransactions = new SearchTransactions();
        this.sendGetTransactions = new SendGetTransactions();
        this.addBankAccount = new addBankAccountAPI();
    }
}