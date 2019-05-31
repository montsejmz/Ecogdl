import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ImagenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imagen',
  templateUrl: 'imagen.html',
})
export class ImagenPage {
  imagen;

  storage: firebase.storage.Storage;
  db: firebase.firestore.Firestore;
  user: firebase.User;

  posicion='';
  tipo='';
  tronco='';
  copa='';
  latitud=0;
  longitud=0;


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private geolocation:Geolocation) {
    this.imagen=this.navParams.get('imagen');
    this.storage=firebase.storage();
    this.db= firebase.firestore();
    this.user= firebase.auth().currentUser;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud= resp.coords.latitude;
      this.longitud= resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagenPage');
  }

  subirImagen(){
    let imagen={
      latitud: this.latitud,
      longitud: this.longitud,
      tipo: this.tipo,
      tronco:this.tronco,
      copa:this.copa,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      url:'',
      user:this.user.uid,
    
    }

    let loading =this.loadingCtrl.create({
      content:"Subiendo imagen..."
    });
    loading.present();


    this.db.collection('imagenes').add(imagen)
    .then(ref=>{
      let nombre= ref.id;
      let uploadTask= this.storage.ref('imagenes/' + nombre + '.jpg').putString(this.imagen, 'data_url');

      uploadTask.then(exito=>{
        loading.dismiss();
        let url =exito.downloadURL;
        ref.update({url:url});
        this.navCtrl.pop();
      })
      .catch(error=>{
        console.log(JSON.stringify(error));
      });
      
    })


    
  }

}
