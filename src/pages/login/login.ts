import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
user = {} as User ;

  constructor(public loader: LoadingController ,private afAuth : AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams) {
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  async login(user : User ){
    console.log(user.email)
    try{
    const result = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(result);
      if(result){
       
        this.afAuth.authState.subscribe(data =>{
          if(data && data.email && data.uid){
            console.log(data)
            localStorage.setItem("email",data.email);
            this.navCtrl.push(HomePage);
            window.location.reload();
          }
        })
       
      }
      
  }
  catch(e){
    console.error(e);
  }

}
  register(){
    this.navCtrl.push(RegisterPage);
  }
  restart(){
   /* this.afAuth.auth.sendPasswordResetEmail(user.email);
    console.log("restart OK")*/
    this.navCtrl.push("ResetPasswordPage");
  }
}
