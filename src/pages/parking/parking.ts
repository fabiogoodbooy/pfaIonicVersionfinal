import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservationPage } from '../reservation/reservation';
/**
 * Generated class for the ParkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parking',
  templateUrl: 'parking.html',
})
export class ParkingPage {
  Debut : String = new Date().toISOString();
  items: string[];
  showList: boolean = false;
  public goalList;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingPage');
   
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
        this.navCtrl.push(ReservationPage,{
         parking : parking
        })
       }
 
}
