import { ProfilePage } from './../profile/profile';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,  } from 'ionic-angular';
import { AngularFireAuth} from "angularfire2/auth";
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user ={} as User;
  ConfirmePassword : String;
  constructor(private alertCtrl: AlertController,
    private afauth : AngularFireAuth,public navCtrl: NavController,
     public navParams: NavParams,public loader: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register(user : User){
    console.log(user.password)
    if(user.password == this.ConfirmePassword){
    
    try{
      
    const result =  this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password);
    localStorage.setItem("email",user.email);
   
    this.navCtrl.push(ProfilePage);

  }
  catch(e){
    console.log(e);
    }

}
else{
  this.presentAlert()
}
}
presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'OUPS',
    subTitle: 'Votre mot de passe et votre mot de passe de confirmation ne correspondent pas.',
    buttons: ['OK']
  });
  alert.present();
}
}
