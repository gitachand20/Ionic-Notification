import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the TambahInfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tambah-info',
  templateUrl: 'tambah-info.html',
})
export class TambahInfo {

   // Define FormBuilder /model properties
   public form                   : FormGroup;
   public infoJudul              : any;
   public infoGambar             : any;
   public infoKeterangan         : any;
   // Flag to be used for checking whether we are adding/editing an entry
   public isEdited               : boolean = false;
   // Flag to hide the form upon successful completion of remote operation
   public hideForm               : boolean = false;
   // Property to help ste the page title
   public pageTitle              : string;
   // Property to store the recordID for when an existing entry is being edited
   public recordID               : any      = null;
   private baseURI               : string  = "http://akakomapp.hol.es/Akakom/Info/";

   // Initialise module classes
   constructor(public navCtrl    : NavController,
               public http       : Http,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController)
   {

      // Create form builder validation rules
      this.form = fb.group({
         "judul"                  : ["", Validators.required],
         "gambar"                 : [""],
         "keterangan"             : ["", Validators.required]
      });
   }



   // Determine whether we adding or editing a record
   // based on any supplied navigation parameters
   ionViewWillEnter()
   {
      this.resetFields();

      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Amend entry';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Create entry';
      }
   }



   // Assign the navigation retrieved data to properties
   // used as models on the page's HTML form
   selectEntry(item)
   {
      this.infoJudul        = item.judul;
      this.infoGambar       = item.gambar;
      this.infoKeterangan   = item.keterangan;
      this.recordID         = item.id;
   }



   // Save a new record that has been added to the page's HTML form
   // Use angular's http post method to submit the record data
   // to our remote PHP script (note the body variable we have created which
   // supplies a variable of key with a value of create followed by the key/value pairs
   // for the record data
   createEntry(judul, gambar, keterangan)
   {
      let body     : string   = "key=create&judul=" + judul + "&keterangan=" + keterangan + "&gambar=" + gambar, 
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "manage-data.php";

      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.hideForm   = true;
            this.sendNotification(`Informasi mengenai ${judul} telah berhasil disimpan`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Terjadi kesalahan...');
         }
      });
   }



   // Update an existing record that has been edited in the page's HTML form
   // Use angular's http post method to submit the record data
   // to our remote PHP script (note the body variable we have created which
   // supplies a variable of key with a value of update followed by the key/value pairs
   // for the record data
   updateEntry(judul, gambar, keterangan)
   {
      let body       : string = "key=update&judul=" + judul + "&keterangan=" + keterangan + "&gambar=" + gambar + "&recordID=" + this.recordID,
          type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers    : any     = new Headers({ 'Content-Type': type}),
          options    : any     = new RequestOptions({ headers: headers }),
          url        : any     = this.baseURI + "manage-data.php";

      this.http.post(url, body, options)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.hideForm  =  true;
            this.sendNotification(`Informasi mengenai ${judul} telah berhasil diperbarui`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Terjadi kesalahan...');
         }
      });
   }



   // Remove an existing record that has been selected in the page's HTML form
   // Use angular's http post method to submit the record data
   // to our remote PHP script (note the body variable we have created which
   // supplies a variable of key with a value of delete followed by the key/value pairs
   // for the record ID we want to remove from the remote database
   deleteEntry()
   {
      let judul      : string = this.form.controls["judul"].value,
          body       : string = "key=delete&recordID=" + this.recordID,
          type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers    : any    = new Headers({ 'Content-Type': type}),
          options    : any    = new RequestOptions({ headers: headers }),
          url        : any    = this.baseURI + "manage-data.php";

      this.http.post(url, body, options)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.hideForm     = true;
            this.sendNotification(`Informasi mengenai ${judul} telah berhasil dihapus`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Terjadi Kesalahan...');
         }
      });
   }



   // Handle data submitted from the page's HTML form
   // Determine whether we are adding a new record or amending an
   // existing record
   saveEntry()
   {
      let judul          : string = this.form.controls["judul"].value,
          gambar         : string = this.form.controls["gambar"].value,
          keterangan     : string = this.form.controls["keterangan"].value;

      if(this.isEdited)
      {
         this.updateEntry(judul, gambar, keterangan);
      }
      else
      {
         this.createEntry(judul, gambar, keterangan);
      }
   }



   // Clear values in the page's HTML form fields
   resetFields() : void
   {
      this.infoJudul           = "";
      this.infoGambar          = "";
      this.infoKeterangan      = "";
   }



   // Manage notifying the user of the outcome
   // of remote operations
   sendNotification(message)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }

}
