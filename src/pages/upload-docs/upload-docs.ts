import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper'

/**
 * Generated class for the UploadDocsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-docs',
  templateUrl: 'upload-docs.html',
})
export class UploadDocsPage {
	canGoNext:boolean;
	requirements:any[] = [
	{name:'Medical License'},
	{name:'Graduation Certificate'},
	{name:'Tax Card'},
	{name:'ID(Front)'},
	{name:'ID(Back)'},
	]

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private helper:HelperProvider) {
  }



  async uploadDoc(item){
	let photo = await this.helper.takePhoto();
    if (photo) {
      item.doc = photo
      item.photoType = 'base64';
    }
    this.canGoNext = (this.requirements.filter((item)=> {return item.doc}).length == this.requirements.length)
  }

  goNext(){
  	this.navCtrl.push('MedalPlansPage')
  }


}
