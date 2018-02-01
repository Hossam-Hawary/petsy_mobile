 
export class UserValidator {


   static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value && control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return null;
        } else {
            return { 'invalidEmail': true };
        }
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value && control.value.match(/^.{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

	
    static fullnameValidator(control) {
        if (control.value && control.value.match(/^[a-zA-Z]{1}[a-zA-Z\. \-_]{2,50}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }


    static usernameValidator(control) {
        if (control.value && control.value.match(/^[a-zA-Z]{3,50}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
}
