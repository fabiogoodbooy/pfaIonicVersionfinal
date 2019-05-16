import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Louer } from './../../models/louer';
import { Lexer } from '@angular/compiler';
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
  
  id_user_locataire;
  constructor(public db: AngularFireDatabase,private afAuth : AngularFireAuth,private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
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
}
