import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadDocsPage } from './upload-docs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UploadDocsPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadDocsPage),TranslateModule
  ],
})
export class UploadDocsPageModule {}
