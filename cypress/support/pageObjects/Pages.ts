import { BankAccountsPage } from "./BankAccountPage";
import { HomePage } from "./HomePage";
import { HomePageOnboardingScreen } from "./HomePageOnboardingScreen";
import { NavigationMenu } from "./NavigationMenu";
import { SignInPage } from "./SignInPage";
import { SignUpPage } from "./SignUpPage";
import { MyAccountPage } from "./MyAccountPage";

export class Pages {
 public homePage:HomePage;
 public navigationMenu:NavigationMenu;
 public signInPage:SignInPage;
 public signUpPage:SignUpPage;
 public homePageOnboardingScreen:HomePageOnboardingScreen;
 public bankAccountPage:BankAccountsPage;
 public myAccountPage:MyAccountPage;
    
    constructor(){
     this.homePage = new HomePage();
     this.navigationMenu = new NavigationMenu();
     this.signInPage = new SignInPage();
     this.signUpPage = new SignUpPage();
     this.homePageOnboardingScreen = new HomePageOnboardingScreen();
     this.bankAccountPage = new BankAccountsPage();
     this.myAccountPage = new MyAccountPage();
    }
}