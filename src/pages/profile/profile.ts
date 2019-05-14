import { Profile } from './../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database'
import { AngularFireStorage } from 'angularfire2/storage';
import { storage } from 'firebase';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
profile = {} as Profile;
  constructor( private afDatabase : AngularFireDatabase ,private afAuth : AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth =>{
this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
.then(()=> console.log("ok"))
    })
  }

  
}
