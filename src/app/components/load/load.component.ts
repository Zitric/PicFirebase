import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { LoadImagesService } from '../../services/load-images.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: []
})
export class LoadComponent implements OnInit {

  files: FileItem [] = [];
  hoverDrop = false;

  constructor( public _LoadImages: LoadImagesService) { }

  ngOnInit() {
  }

  loadImages() {
    this._LoadImages.loadImagesFirebase( this.files );
  }

  cleanFiles() {
    this.files = [];
  }

  deleteFile( index: number ) {
    this.files.splice( index, 1);
  }

  testOverElement( event ) {
    console.log( event );
  }
}
