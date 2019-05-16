import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { compareDates } from 'ionic-angular/umd/util/datetime-util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetailpublicationPage } from '../detailpublication/detailpublication';
/**
 * Generated class for the RecherchePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recherche',
  templateUrl: 'recherche.html',
})
export class RecherchePage {
  dateDebut;
  dateFin;
  df;
  comdebut = new Date('2019-05-01');
  comfin = new Date();
  itemes:Observable<any>;
  constructor(public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
     
    this.itemes = this.db.list(`/publication`).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
      
    );
   
      console.log(this.itemes);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecherchePage');
  }
  change(datePicker){    
    datePicker.open();
  }
  
  check(){
    
  
 
  }
  detail(key){
    console.log(key);
    this.navCtrl.push(DetailpublicationPage,{
      keypublication : key
    });
  }
}
