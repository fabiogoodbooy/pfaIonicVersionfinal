import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Publication } from '../../models/publication';
import { HomePage } from '../home/home';

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
keypublication:string ;
  constructor( public loader: LoadingController,public db: AngularFireDatabase,private afAuth : AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    let load = this.loader.create({
      content :'Loading ... '
      
  });
  load.present().then(()=>{
    this.keypublication = navParams.get('data');
    console.log(navParams.get('data'))
    console.log(this.keypublication);
    load.dismissAll();
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraruitPage');
  }
  publie(){
   
      this.db.list(`publication`).update(this.keypublication,this.publication)
      .then(()=> {
        console.log("reservation gratuit OK");
        this.navCtrl.push(HomePage)
            
    }
      )
         
  }

}
