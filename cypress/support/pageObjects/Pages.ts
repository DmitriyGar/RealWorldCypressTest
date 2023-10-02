import { HomePage } from "./HomePage";
import { NavigationMenu } from "./NavigationMenu";
import { SignInPage } from "./SignInPage";
import { SignUpPage } from "./SignUpPage";
import { CommonElements } from "./CommonElements";

export class Pages {
 public homePage:HomePage;
 public navigationMenu:NavigationMenu;
 public signInPage:SignInPage;
 public signUpPage:SignUpPage;
 public commonElements:CommonElements
    
    constructor(){
     this.homePage = new HomePage();
     this.navigationMenu = new NavigationMenu();
     this.signInPage = new SignInPage();
     this.signUpPage = new SignUpPage();
     this.commonElements = new CommonElements()
    }
}