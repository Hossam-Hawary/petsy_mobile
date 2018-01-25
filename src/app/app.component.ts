import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService} from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import { HelperProvider } from '../providers/helper/helper';
import { UserProvider } from '../providers/user/user'

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar
    , public splashScreen: SplashScreen, private translate: TranslateService,
    private network:Network, private helper:HelperProvider, private userProvider:UserProvider) {
    this.initializeApp();
    if(this.userProvider.currentUser()) this.rootPage = HomePage;
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: 'LoginPage' },
      { title: 'Sign Up', component: 'SignUpPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.helper.changeConnection((this.network.type != "none"));
      this.network.onDisconnect().subscribe((data) => {
          this.helper.changeConnection(false);
      });

      this.network.onConnect().subscribe((data) => {
          this.helper.changeConnection(true);
        });
              // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('en');
         // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use('en');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
