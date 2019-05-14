import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

/**
 * Generated class for the ShowProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-profile',
  templateUrl: 'show-profile.html',
})
export class ShowProfilePage {
  profileData : Observable<any>
  email:string ;
  constructor(public loader: LoadingController ,public navCtrl: NavController, public navParams: NavParams  ,private afAuth : AngularFireAuth, private afDatabase : AngularFireDatabase) {
 
    this.afAuth.authState.take(1).subscribe(data=>{
      if(data ){
      console.log( data.uid );
      console.log(data.email);
    this.email=data.email;
   
     this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
   console.log(this.profileData);
 }
   })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowProfilePage');
  }

}
