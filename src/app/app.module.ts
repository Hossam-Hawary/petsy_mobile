import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Pro } from '@ionic/pro';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { FIREBASE_CONFIG } from './app.config'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { HelperProvider } from '../providers/helper/helper';
import { ApiProvider } from '../providers/api/api';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { EmailComposer } from '@ionic-native/email-composer';
import { UserProvider } from '../providers/user/user';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { CallNumber } from '@ionic-native/call-number';
import {GoogleMaps} from '@ionic-native/google-maps';
import { VetHelperProvider } from '../providers/vet-helper/vet-helper';
import { MapHelperProvider } from '../providers/map-helper/map-helper';



  export function createTranslateLoader(http: HttpClient) {
      return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
  const IonicPro = Pro.init('e9c41020', {
    appVersion: "0.0.1"
  });

// export class MyErrorHandler implements ErrorHandler {
//   handleError(err: any): void {
//     IonicPro.monitoring.handleNewError(err);
//   }
// }


const pages :any[]=[
    HomePage,
]
@NgModule({
  declarations: [
    MyApp,
    ...pages

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
     ...pages
  ],
  providers: [
    StatusBar, SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HelperProvider, ApiProvider, Network, Toast, SocialSharing, SpinnerDialog,
    EmailComposer,Camera,ImagePicker,File,
    UserProvider,GoogleMaps,CallNumber,
    VetHelperProvider,
    VetHelperProvider,
    MapHelperProvider

  ]
})
export class AppModule {}
