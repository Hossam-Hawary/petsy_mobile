import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Pro } from '@ionic/pro';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

  export function createTranslateLoader(http: HttpClient) {
      return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
  const IonicPro = Pro.init('1430dc61', {
    appVersion: "0.0.1"
  });

  export class MyErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
  }
}


const pages :any[]=[
    HomePage,
    ListPage
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
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: MyErrorHandler }

  ]
})
export class AppModule {}
