import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPage } from './sign-up';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    SignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
    TranslateModule.forChild(), ComponentsModule
  ],
})
export class SignUpPageModule {}
