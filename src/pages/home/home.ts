import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { DetailpublicationPage } from '../detailpublication/detailpublication';
import { RecherchePage } from '../recherche/recherche';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: string[];
  showList: boolean = false;
  public goalList;
  searchQuery: string = '';
 
  Parking :String;
  publication ;
  pkdata;
  userid;
  tsinfo;
  profileData ;
  itemes:Observable<any>
public loadoalList;
  
  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController) {
      var query = this.db.database.ref('/reservation/F9VhXy5fwkalcDcAj1rK9MrpOPL2').orderByChild('gratuit').equalTo(false);
      query.once('value', function (snapshot) {
       
        console.log(snapshot.val())
        console.log(snapshot.key) //contains all users that has apply as true
    })
   this.itemes = this.db.list(`/publication`).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  /*this.publication=this.db.list(`/publication`).valueChanges();
    this.publication.subscribe(data =>{
      this.pkdata = data ;
      
      console.log(this.pkdata);
      this.userid=data.userID;
      console.log(data.userID);
    })*/
    
      /*var res = this.db.database.ref().child('reservation');
      var users = this.db.database.ref().child('profile');
      res.on('child_added',snap=>{
        users.child(snap.val().user_id).once('value',user=>{
          console.log(user.val())
        })
        console.log(snap.val());

      })
      console.log()
      this.db.list(`/profile`).valueChanges().subscribe(data => {
       data ;
        
       // console.log(this.goalList.getKey());
      });*/
    
  }
  
  
  detail(key){
    console.log(key);
    this.navCtrl.push(DetailpublicationPage);
  }
  initializeItems() {
    this.items = [
      'Tunis Carthage',
      'Tabarka Ain Draham',
      'Enfidha Hammamet',
      'Monastir Habib Bourguiba',
      'Sfax Thyna',
      'Gafsa Ksar',
      'Touzer Nefta',
      'Djerba Zarzis',
      'Gabés Matmata',
    
    ];
    }
    filterList(evt) {
      this.initializeItems();
      
      const searchTerm = evt.srcElement.value;
      console.log(searchTerm)
      if (!searchTerm) {
      return;
      }
      
      this.goalList = this.goalList.filter(currentGoal => {
        console.log(currentGoal.nom)
      if (currentGoal.nom && searchTerm) {
      if (currentGoal.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
      return true;
      }
      return false;
      }
      });
      }
      getItems(ev : any){
        // Reset items back to all of the items
        this.initializeItems();
    
        // set val to the value of the searchbar
        let val = ev.target.value;
    
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          
          // Filter the items
          this.items = this.items.filter((item) => {
            return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
          
          // Show the results
          this.showList = true;
        } else {
          
          // hide the results when the query is empty
          this.showList = false;
        }
       
      }
      check(parking){
        this.navCtrl.push(RecherchePage,{
         parking : parking
        })
       }
     
}
