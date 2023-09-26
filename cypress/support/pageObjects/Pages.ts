import { HomePage } from "./HomePage";
import { NavigationMenu } from "./NavigationMenu";

export class Pages {
 public homePage:HomePage;
 public navigationMenu:NavigationMenu;
    
    constructor(){
     this.homePage = new HomePage();
     this.navigationMenu = new NavigationMenu();
    }
}