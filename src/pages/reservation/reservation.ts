import { HomePage } from './../home/home';
import { ParkingPage } from './../parking/parking';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Reservation } from '../../models/reservation';
import { Observable } from 'rxjs';
import { GraruitPage } from '../graruit/graruit';
import { map,take } from 'rxjs/operators';
import 'rxjs/add/operator/take'; 


/**
 * Generated class for the ReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {
  parking :string;
  reservation = {} as Reservation;
  parkingData : Observable<any>
  tsdata :Observable<any>
  lieu : string ;
  nbdispo ;
  pkdata;
  key;
  test ;
  constructor(private alertCtrl: AlertController,
    public db: AngularFireDatabase,private afAuth : AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
    this.parking = navParams.get('parking');
    console.log(this.parking)

    this.parkingData=this.db.object(`/Parking/${this.parking}`).valueChanges();
    this.parkingData.subscribe(data =>{
      this.pkdata = data ;
      console.log(this.pkdata);
      this.lieu=data.Lieu;
      if( data.placeDispo >0){
        console.log("OK");

      }else{
        let alert = this.alertCtrl.create({
          title: 'Oups ! Pas de place ',
          subTitle: 'désolé il n y a pas de place',
          buttons: ['cherche un autre parking']
        });
        alert.present();
        this.navCtrl.push(ParkingPage)
        console.log("Erreur");
      }
      console.log(data.placeDispo);
      this.nbdispo=data.placeDispo - 1;
      console.log(this.nbdispo);
    })
  }

  ionViewDidLoad() {
  
    
  }
  change(datePicker){    
    datePicker.open();
  }
  
  payent(){
   
    this.afAuth.authState.take(1).subscribe(auth =>{
       this.db.list(`reservation`).snapshotChanges().subscribe(ts => {
        this.test=ts;
        console.log(this.test.key)
        this.test.map(item => {
          console.log(item.$key)
        })
      });
      /*or(let i of this.test.length){
        console.log(i);
      }*/
      console.log(this.test)
    var query = this.db.database.ref(`/reservation`).orderByChild('gratuit').equalTo(false);
      query.once('value', function (snapshot) {
        console.log(snapshot.val()) //contains all users that has apply as true
    })
  })


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
            this.reservation.gratuit = false;
            this.reservation.parking = this.parking;
            this.reservation.prix = "30 Dt"
            this.afAuth.authState.take(1).subscribe(auth =>{
              this.reservation.userID=auth.uid;
              console.log(this.reservation.userID)
            
              this.db.list(`reservation`).push(this.reservation)
              .then((snap)=> {console.log("reservation OK");
                      console.log(snap.key); 
            }
              )
            })
                  
            console.log(this.reservation)
            this.db.list(`Parking`).update(this.parking,{placeDispo : this.nbdispo});
            //this.navCtrl.push(HomePage);
            //window.location.reload();
            
          }
        }
      ]
    });
    alert.present();
    //this.vibration.vibrate([2000,1000,2000]);
  
  }
  gra(){
    var  db = new Date (this.reservation.dateDebut);
    var  yeardb = db.getFullYear();
    var monthdb = db.getMonth();
    var daydb =db.getDay();

    var fn = new Date (this.reservation.dateFin)
    var  yearfn = fn.getFullYear();
    var monthfn = fn.getMonth();
    var dayfn =fn.getDay();
   
    //var pickdt = parseInt(this.reservation.dateFin);
  
    console.log( (((yearfn-yeardb )*365)+(((monthfn-monthdb)*30)+(dayfn-daydb)) ))
    console.log(this.reservation.dateDebut);
    console.log(yeardb,monthdb,daydb);
    console.log(yearfn,monthfn,dayfn);
    //return ((dropdt - pickdt) / (24 * 3600 * 1000));
  }
  dateDifference() {
    var  db = new Date (this.reservation.dateDebut);
    var  yeardb = db.getFullYear();
    var monthdb = db.getMonth();
    var daydb =db.getDay();

    var fn = new Date (this.reservation.dateFin)
    var  yearfn = fn.getFullYear();
    var monthfn = fn.getMonth();
    var dayfn =fn.getDay();
   
    //var pickdt = parseInt(this.reservation.dateFin);
    return (((yearfn-yeardb )*365)+(((monthfn-monthdb)*30)+(dayfn-daydb)) )

}
gratuit(){
  this.reservation.gratuit=true
            this.reservation.parking = this.parking;
            this.reservation.prix = "30 Dt"
            this.afAuth.authState.take(1).subscribe(auth =>{
              this.reservation.userID=auth.uid;
              console.log(this.reservation.userID)
            
              this.db.list(`publication`).push(this.reservation)
              .then((snap)=> {console.log("Entrer votre voiture");
                      console.log(snap.key); 
                      console.log(this.reservation)
            this.db.list(`Parking`).update(this.parking,{placeDispo : this.nbdispo});
            this.navCtrl.push(GraruitPage,{
              data :snap.key
            
            });
            }
              )
            })
                  
            
  /*
  this.reservation.gratuit=true
  this.afAuth.authState.take(1).subscribe(auth =>{
    this.db.list(`reservation/${auth.uid}`).push(this.reservation)
    .then((snap)=> {console.log("reservation OK");
            console.log(snap.key); 
            this.key=snap.key
            console.log(this.key)
            
  }
    )
        })
        key=this.key

  this.navCtrl.push(GraruitPage,{
    data :key
  
  });
  console.log("*********")*/
}

}
