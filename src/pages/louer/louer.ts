import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LouerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-louer',
  templateUrl: 'louer.html',
})
export class LouerPage {
  test :Observable<any[]>;
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase,private afAuth : AngularFireAuth) {
    this.afAuth.authState.take(1).subscribe(data=>{
      this.test= this.db.list('publication',ref => ref.orderByChild('id_user_locataire').equalTo(data.uid)).snapshotChanges().pipe(
      map(
     (changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })
        ))
      
        ))
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LouerPage');
  }
  anuller(key){
    let alert = this.alertCtrl.create({
      title: 'Confirmer la reservation',
      message: 'NB:l annulation gratuit pendant deux jours',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
            
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
          
       this.db.list(`publication/${key}`).remove("id_user_locataire")
       this.navCtrl.push(HomePage)
          }
        }
      ]
    });
    alert.present();
      
  
  
  }

}
