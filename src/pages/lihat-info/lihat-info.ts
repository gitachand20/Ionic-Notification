import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LihatInfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lihat-info',
  templateUrl: 'lihat-info.html',
})
export class LihatInfo {

  public items : any = [];
   constructor(public navCtrl: NavController,
               public http   : Http)
   {

   }


   ionViewWillEnter()
   {
      this.load();
   }

   // Retrieve the JSON encoded data from the remote server
   // Using Angular's Http class and an Observable - then
   // assign this to the items array for rendering to the HTML template
   load()
   {
      this.http.get('http://akakomapp.hol.es/Akakom/Info/retrieve-data.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.items = data;
      });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LihatInfo');
  }

}
