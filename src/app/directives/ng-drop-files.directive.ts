import { Directive, EventEmitter, ElementRef,
          HostListener, Input, Output } from '@angular/core';
import {FileItem} from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  constructor() { }

  @Input() files: FileItem[] = [];

  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  @HostListener( 'dragover', ['$event'])
  public onDragEnter( event: any) {
    this.mouseOver.emit( true );
    this._preventStop( event );
  }

  @HostListener( 'dragleave', ['$event'])
  public onDragLeave( event: any) {
    this.mouseOver.emit( false );
  }

  @HostListener( 'drop', ['$event'])
  public onDrop( event: any) {
    const transfer = this._getTransfer( event );
    if ( transfer ) {
      this._extractFiles( transfer.files );
      this._preventStop( event );
      this.mouseOver.emit( false );
    }
  }

  private _getTransfer( event: any ) {
    return event.dataTransfer ?
      event.dataTransfer :
      event.originalEvent.dataTransfer;
  }

  private _extractFiles( fileList: FileList) {
    let auxFile;
    for ( const property of Object.getOwnPropertyNames( fileList ) ) {
      auxFile = fileList[ property ];
      if ( this._fileLoaded( auxFile )) {
        this.files.push( new FileItem( auxFile ));
      }
    }
    console.log(this.files);
  }

  // Validations
  private _fileLoaded ( file: File ): boolean {
    return ( !this._fileDropped( file.name ) && this._isAnImage( file.type ) );
  }


  private _preventStop ( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileDropped ( fileName: string ): boolean {
    for( const file of this.files ) {
      if ( file.fileName === fileName ) {
        console.log('The file ' + fileName + ' is added already' );
        return true;
      }
    }
    return false;
  }

  private _isAnImage ( typeFile: string ): boolean {
    return ( typeFile === '' || typeFile === undefined) ?
      false :
      typeFile.startsWith( 'image' );
  }

}
