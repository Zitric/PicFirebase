import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_ROUTING } from './app.routes';

// Services
import { LoadImagesService } from './services/load-images.service';

// Firebase
import { environment } from '../environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Directives
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

// Components
import { AppComponent } from './app.component';
import { PhotosComponent } from './components/photos/photos.component';
import { LoadComponent } from './components/load/load.component';


@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    LoadComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [
    AngularFirestore,
    LoadImagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
