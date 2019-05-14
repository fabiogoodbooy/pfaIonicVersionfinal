import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  username: string = '';
  message: string = '';
  _chatSubscription;
  profileData : string ;
  messages;
  constructor(public navCtrl: NavController  ,private afAuth : AngularFireAuth, public navParams: NavParams,public db: AngularFireDatabase) {
    this.username = localStorage.getItem("email");
    
    
    this.db.list(`/chat`).valueChanges().subscribe(data => {
      this.messages=data ;
      console.log(data);
 
    console.log(this.message);
  })
  }
  sendMessage() {
    
    this.db.list(`/chat`).push({
      username: this.username,
      message: this.message
    }).then( () => {
      // message is sent
    }).catch( () => {
      // some error. maybe firebase is unreachable
    });
  
    this.message = '';
  
  }

  ionViewDidLoad() {
    
    this.db.list(`/chat`).push({
      specialMessage: true,
      message: `${this.username} has joined the room`
    });
    this.db.list(`/chat`).valueChanges().subscribe(data => {
      this.messages=data ;
      console.log(data);
    });
  
    console.log(this.message);
  }
  ionViewWillLeave(){
  /*  this._chatSubscription.unsubscribe();
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} has left the room`
    });*/
  }

}
