import { ShowProfilePage } from './../show-profile/show-profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ListreservationPage } from '../listreservation/listreservation';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth : AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }
  profile(){
    this.navCtrl.push(ShowProfilePage);
  }
  reservation(){
    this.navCtrl.push(ListreservationPage);
  }
  logout(){
    this.afAuth.auth.signOut();
    localStorage.clear();
  }
}
