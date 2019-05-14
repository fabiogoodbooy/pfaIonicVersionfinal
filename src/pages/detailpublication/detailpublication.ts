import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailpublicationPage');
  }
  louer(){
    let alert = this.alertCtrl.create({
      title: 'vous etes sure ?',
      message: 'le prix total est : 120Dt ',
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
           
                  console.log('confirmer')         
            
          }
        }
      ]
    });
    alert.present();
  }
}
