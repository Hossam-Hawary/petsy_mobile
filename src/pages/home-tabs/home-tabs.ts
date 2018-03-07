import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the HomeTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-tabs',
  templateUrl: 'home-tabs.html',
})
export class HomeTabsPage {
  tabs:any = {
    home:HomePage,
    profile:'ProfilePage',
    more:'MorePage'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
