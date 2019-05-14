import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule} from "angularfire2";
import { FIREBASE_CONFIG } from './app.firevase.config';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule} from "angularfire2/database";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { ShowProfilePage } from '../pages/show-profile/show-profile';
import { ChatPage } from '../pages/chat/chat';
import { ParkingPage } from '../pages/parking/parking';
import { ReservationPage } from '../pages/reservation/reservation';
import { InfoPage } from '../pages/info/info';
import { ListreservationPage } from '../pages/listreservation/listreservation';
import { GraruitPage } from '../pages/graruit/graruit';
import { DetailpublicationPage } from '../pages/detailpublication/detailpublication';
import { RecherchePage } from '../pages/recherche/recherche';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ShowProfilePage,
    ChatPage,
    ParkingPage,
    ReservationPage,
    InfoPage,
    ListreservationPage,
    GraruitPage,
    DetailpublicationPage,
    RecherchePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ShowProfilePage,
    ChatPage,
    ParkingPage,
    ReservationPage,
    InfoPage,
    ListreservationPage,
    GraruitPage,
    DetailpublicationPage,
    RecherchePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
