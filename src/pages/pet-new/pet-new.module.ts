import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetNewPage } from './pet-new';

@NgModule({
  declarations: [
    PetNewPage,
  ],
  imports: [
    IonicPageModule.forChild(PetNewPage),
  ],
})
export class PetNewPageModule {}
