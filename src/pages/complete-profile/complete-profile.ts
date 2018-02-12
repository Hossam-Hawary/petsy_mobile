import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from '@angular/forms'
import { HomePage } from '../home/home'
import { UserProvider } from '../../providers/user/user'
import { HelperProvider } from '../../providers/helper/helper'
import { UserValidator } from  '../../validators/user-validator';

/**
 * Generated class for the CompleteProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complete-profile',
  templateUrl: 'complete-profile.html',
})
export class CompleteProfilePage {
	profileForm:FormGroup
   	errorMessage:string;
   	imgSrc:string;
    photoType:string;
    uploading:boolean = false;
    country:any ='Egypt';
    countries:any[]= [
    {name:"Egypt", cities:[
    'Cairo','Alexandria','Giza','Luxor','Mansoura'
    ]},
    {name:"Lebanon",cities:[
    'Beirut','Tripoli','Zahlé','Sidon'
    ]},
    {name:"KSA",cities:[
    'Riyadh','Jeddah','Mecca','Medina'
    ]},
    {name:"UAE",cities:[
    'Dubai','Abu Dhabi','Sharjah','Al Ain'
    ]},
    {name:"Jordan",cities:[
    'Amman','Zarqa','Irbid','Russeifa'
    ]},
    ]
    cities:any= {
      Egypt:[
      'Cairo','Alexandria','Giza','Luxor','Mansoura'
      ],
      Lebanon:[
      'Beirut','Tripoli','Zahlé','Sidon'
      ],
      KSA:[
      'Riyadh','Jeddah','Mecca','Medina'
      ],
      UAE:[
      'Dubai','Abu Dhabi','Sharjah','Al Ain'
      ],
      Jordan:[
      'Amman','Zarqa','Irbid','Russeifa'
      ],
    }
   constructor(public navCtrl: NavController, public navParams: NavParams,
  	 public formBuilder: FormBuilder, private userProvider:UserProvider,
     private helper:HelperProvider) {
  }

 ngOnInit(){

    this.profileForm = this.formBuilder.group({
        name: ['', Validators.compose([UserValidator.fullnameValidator, Validators.required])],
        username: ['', Validators.compose([UserValidator.usernameValidator, Validators.required])],
        photoUrl: [''],
        phoneNumber:['', Validators.compose([Validators.pattern('[0-9]{11}'), Validators.required])],
        country:['', Validators.required],
        city:['', Validators.required]
    });
 }
	async takePhoto(){
    let photo = await this.helper.takePhoto();
    if (photo) {
      this.imgSrc = photo
      this.profileForm.controls.photoUrl.setValue(this.imgSrc)
      this.photoType = 'base64';
    }
	}

   async uploadPhoto(){
    const result:any = await this.helper.uploadImage()
    if(result.message) this.helper.createToast(result.message)
    if(result.success){
      this.photoType = 'systemUri';
      this.imgSrc = result.fileUri
      this.profileForm.controls.photoUrl.setValue(this.imgSrc)
    }       
  }
  countryChanged(){
   this.profileForm.controls.city.setValue('')
  }

 async createProfile(){
   console.log(this.profileForm.value)
  this.uploading = true;
  this.helper.showSpinner()
 	const result = await this.userProvider.createProfile(this.profileForm.value, this.photoType)
  this.navCtrl.setRoot(HomePage)
  this.helper.hideSpinner()
 }


}
