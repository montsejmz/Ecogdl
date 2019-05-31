import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera'
import { ImagenPage } from '../imagen/imagen';
import { Geolocation } from '@ionic-native/geolocation';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imagenPage=ImagenPage;
  loginPage=LoginPage;

  user: firebase.User;
  db: firebase.firestore.Firestore;

  items=[];

  constructor(public navCtrl: NavController, public camera:Camera, public toastCtrl:ToastController) {
    this.user=firebase.auth().currentUser;
    this.db= firebase.firestore();

    this.db.collection('imagenes')
    .onSnapshot(query=>{ //query es toda la respuesta, todos los objetos
      this.items=[];
      query.forEach(imagen =>{
        if(imagen.data().user== this.user.uid){
          this.items.push(imagen.data());

        }
      })
    });

   
  }

  getPicture(){
    const options:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options)
    .then(imagen =>{
      this.navCtrl.push(this.imagenPage,{imagen:'data:image/jpeg;base64,'+ imagen});
    },error=>{
      console.log(JSON.stringify(error));
    });
    
  }

  logOut(){
    firebase.auth().signOut()
    .then(data=>{
      const toast = this.toastCtrl.create({
        message:"Se cerró sesión correctamente",
        duration:2000,

        position:'top'
      });
      toast.present();
      this.navCtrl.setRoot(this.loginPage)
    })
    .catch(error=>{
      const toast = this.toastCtrl.create({
        message:"Hubo un error cerrando sesiómn",
        duration:2000,
        position:'top'
      });
      toast.present();
    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  }


}
