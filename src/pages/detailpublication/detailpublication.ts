import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Louer } from './../../models/louer';
import { Lexer } from '@angular/compiler';
import { LoginPage } from '../login/login';
/**
 * Generated class for the DetailpublicationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailpublication',
  templateUrl: 'detailpublication.html',
})
export class DetailpublicationPage {
  publication:Observable<any>;
  key;
  sess;
  id_user_locataire;
  constructor(public db: AngularFireDatabase,private afAuth : AngularFireAuth,private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.sess = localStorage.getItem('email');
    this.key = navParams.get("keypublication");
   console.log(this.key);
   

   this.afAuth.authState.take(1).subscribe(auth =>{
     this.id_user_locataire= auth.uid;
   });
    this.publication=this.db.object(`/publication/${this.key}`).valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailpublicationPage');
  }
  louer(){
    if(this.sess){
    let alert = this.alertCtrl.create({
      title: 'vous etes sure ?',
      message: 'le prix total est : 30Dt ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
            
            console.log('Cancel clicked');
          }
        },
        {
          text: 'louer',
          handler: () => {
          
            
           this.db.object(`/publication/${this.key}`).update({
            id_user_locataire: this.id_user_locataire
           });
           this.navCtrl.push(HomePage)
                  console.log('confirmer')         
            
          }
        }
      ]
    });
    alert.present();
  }
  else{
    let alert = this.alertCtrl.create({
      title: 'Vous n avez pas le droit',
      message: 'NB:Connecter pour louer un voiture !',
      buttons: [
       
        {
          text: 'Ok',
          handler: () => {
          
            this.navCtrl.push(LoginPage);
           
            
          }
        }
      ]
    });
    alert.present();
  }
  }
  
}
