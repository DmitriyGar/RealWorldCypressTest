import { HomePage } from "./HomePage";
import { NavigationMenu } from "./NavigationMenu";
import { SignInPage } from "./SignInPage";

export class Pages {
 public homePage:HomePage;
 public navigationMenu:NavigationMenu;
 public signInPage:SignInPage;
    
    constructor(){
     this.homePage = new HomePage();
     this.navigationMenu = new NavigationMenu();
     this.signInPage = new SignInPage();
    }
}