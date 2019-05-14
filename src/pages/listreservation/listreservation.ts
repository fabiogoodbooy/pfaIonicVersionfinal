import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { keyframes } from '@angular/core/src/animation/dsl';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Generated class for the ListreservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-listreservation',
  templateUrl: 'listreservation.html',
})
export class ListreservationPage {
  items ;
test :Observable<any[]>;
daa: any;
  constructor(private alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,private afAuth : AngularFireAuth) {
    
    this.afAuth.authState.take(1).subscribe(data=>{
    /*this.test=this.db.list(`reservation/${data.uid}`).snapshotChanges().pipe(
      map(
     (changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      
        )
      )
    );
    
    console.log(this.test)
 
*/
/*
this.items=this.db.list('reservation',ref => ref.orderByChild('userID').equalTo(data.uid)).snapshotChanges().pipe(
  map(
 (changes => 
    changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  
    )
  )
)
  console.log(this.items)

*/

this.db.list('reservation',ref => ref.orderByChild('userID').equalTo(data.uid)).valueChanges().subscribe(data =>{
  console.log(data)
  this.items=data;
  console.log(this.items)
});
//console.log(this.items)
/*var daa = this.db.database.ref('/reservation')
.orderByChild('userID')
.equalTo(data.uid)
.once('value')
.then (snapshot => snapshot.val())
.then((data)=>{this.test=data
console.log(data)
  console.log(this.test)
  console.log(daa);})
 */
})
     /*   let items = []
       snapshot.forEach((snap)=>{
         items.push({
           userid: snap.val().userID,
           parking : snap.val().parking
         })
        // this.test= snap.val()
        // console.log(this.test)
       })
       console.log(items)
      
        console.log(snapshot.val())
        

       
        console.log(snapshot.key) //contains all users that has apply as true*/
    
 
   
  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListreservationPage');
  }
  delet(key){
   /* let alert = this.alertCtrl.create({
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
            this.afAuth.authState.take(1).subscribe(data=>{
              this.db.list(`reservation/${data.uid}`).remove(key)
            });
            
          }
        }
      ]
    });
    alert.present();*/
    this.afAuth.authState.take(1).subscribe(data=>{
      this.db.list(`reservation/${data.uid}`).remove(key)
    });
  }
  
}
