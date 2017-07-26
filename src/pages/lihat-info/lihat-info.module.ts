import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LihatInfo } from './lihat-info';

@NgModule({
  declarations: [
    LihatInfo,
  ],
  imports: [
    IonicPageModule.forChild(LihatInfo),
  ],
  exports: [
    LihatInfo
  ]
})
export class LihatInfoModule {}
