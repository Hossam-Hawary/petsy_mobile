import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentCardPage } from './payment-card';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PaymentCardPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentCardPage),FormsModule
  ],
})
export class PaymentCardPageModule {}
