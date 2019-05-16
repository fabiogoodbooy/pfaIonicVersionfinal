import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile';

/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {
  profileData ;
  email:string ;
  profile = {} as Profile;
  id_user;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth : AngularFireAuth, private afDatabase : AngularFireDatabase) {
   this.afAuth.authState.take(1).subscribe(data=>{
      if(data ){
      console.log( data.uid );
      console.log(data.email);
    
        this.id_user=data.uid;
       this.afDatabase.object(`profile/${data.uid}`).valueChanges().subscribe(data=>{
        this.profileData=data;
        console.log(this.profileData);
     });

    
     
     console.log(this.email);
        
    }  
   })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfilePage');
  }
  Modifier(){

  }
}
