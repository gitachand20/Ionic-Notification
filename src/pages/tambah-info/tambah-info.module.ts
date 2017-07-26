import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TambahInfo } from './tambah-info';

@NgModule({
  declarations: [
    TambahInfo,
  ],
  imports: [
    IonicPageModule.forChild(TambahInfo),
  ],
  exports: [
    TambahInfo
  ]
})
export class TambahInfoModule {}
