import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedalsListPage } from './medals-list';

@NgModule({
  declarations: [
    MedalsListPage,
  ],
  imports: [
    IonicPageModule.forChild(MedalsListPage),
  ],
})
export class MedalsListPageModule {}
