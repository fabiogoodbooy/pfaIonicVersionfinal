import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { compareDates } from 'ionic-angular/umd/util/datetime-util';

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
  comdebut = new Date('2019-05-01');
  comfin = new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecherchePage');
  }
  change(datePicker){    
    datePicker.open();
  }
  
  check(){
    
      console.log("OK comp")
     console.log( this.comdebut.getDate());
    //  compareDates(this.dateDebut,this.comdebut)
   
    console.log(this.dateDebut);
    console.log(this.dateFin);
  }
}
