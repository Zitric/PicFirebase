import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable()
export class LoadImagesService {

  private IMAGES_FOLDER = 'img';

  constructor( private db: AngularFirestore ) {  }

  private saveImage ( image: { name: string, url: string } ) {
    this.db.collection( '/' + this.IMAGES_FOLDER )
      .add( image );
  }

  loadImagesFirebase ( images: FileItem[] ) {

    const storageRef = firebase.storage().ref();

    for ( const item of images ) {
      item.isLoading = true;
      if ( item.progress >= 100 ) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(this.IMAGES_FOLDER + '/' + item.fileName)
          .put( item.file );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        ( snapshot: firebase.storage.UploadTaskSnapshot ) =>
          item.progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
        ( error ) => console.error('Error to load', error),
        () => {
          console.log('Image load correctly');
          item.url = uploadTask.snapshot.downloadURL;
          item.isLoading = false;
          this.saveImage( {
            name: item.fileName,
            url: item.url
          });
        });

    }

  }
}
