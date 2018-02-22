import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VetListPage } from './vet-list';

@NgModule({
  declarations: [
    VetListPage,
  ],
  imports: [
    IonicPageModule.forChild(VetListPage),
  ],
})
export class VetListPageModule {}
