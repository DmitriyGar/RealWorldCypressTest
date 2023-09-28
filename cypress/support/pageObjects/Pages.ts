import { HomePage } from "./HomePage";
import { NavigationMenu } from "./NavigationMenu";
import { SignInPage } from "./SignInPage";
import { SignUpPage } from "./SignUpPage";

export class Pages {
 public homePage:HomePage;
 public navigationMenu:NavigationMenu;
 public signInPage:SignInPage;
 public signUpPage:SignUpPage;
    
    constructor(){
     this.homePage = new HomePage();
     this.navigationMenu = new NavigationMenu();
     this.signInPage = new SignInPage();
     this.signUpPage = new SignUpPage();
    }
}