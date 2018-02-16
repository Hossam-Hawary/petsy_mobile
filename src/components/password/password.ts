import { Component, Input  } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms'

/**
 * Generated class for the PasswordComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'password',
  templateUrl: 'password.html'
})
export class PasswordComponent {


  passwordType:string = 'password';
  showPassword:boolean = false;
  @Input('control') password: AbstractControl;
  @Input() form:FormGroup;
  constructor() {

  }
  togglePassword(){
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }
}
