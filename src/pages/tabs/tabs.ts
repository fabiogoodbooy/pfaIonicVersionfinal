
import { ChatPage } from './../chat/chat';
import { ShowProfilePage } from './../show-profile/show-profile';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ParkingPage } from '../parking/parking';
import { InfoPage } from '../info/info';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab3Root = ParkingPage;
  tab4Root = LoginPage;
  tab5Root = InfoPage;
  tab6Root = ChatPage;
  sess:string;
  constructor( ) {
    this.sess = localStorage.getItem('email');
     
 
  }
}
