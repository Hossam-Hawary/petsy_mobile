import { NgModule } from '@angular/core';
import { PasswordComponent } from './password/password';
import { IonicModule } from 'ionic-angular';


@NgModule({
	declarations: [PasswordComponent],
	imports: [IonicModule],
	exports: [PasswordComponent]
})
export class ComponentsModule {}
