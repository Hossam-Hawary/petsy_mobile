import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeTabsPage } from './home-tabs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomeTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeTabsPage),TranslateModule
  ],
})
export class HomeTabsPageModule {}
