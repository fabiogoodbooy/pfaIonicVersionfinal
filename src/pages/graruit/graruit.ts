import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Publication } from '../../models/publication';

/**
 * Generated class for the GraruitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graruit',
  templateUrl: 'graruit.html',
})
export class GraruitPage {
publication = {} as Publication;
keyreservation:string ;
  constructor( public loader: LoadingController,public db: AngularFireDatabase,private afAuth : AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    let load = this.loader.create({
      content :'Loading ... '
      
  });
  load.present().then(()=>{
    this.keyreservation = navParams.get('data');
    console.log(navParams.get('data'))
    console.log(this.keyreservation);
    load.dismissAll();
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraruitPage');
  }
  publie(){
    this.publication.keyreservation=this.keyreservation;
  
      this.db.list(`publication`).push(this.publication)
      .then(()=> {
        console.log("reservation gratuit OK");
              
            
    }
      )
         
  }

}
