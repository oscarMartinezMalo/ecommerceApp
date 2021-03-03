import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-update',
  templateUrl: './file-update.component.html',
  styleUrls: ['./file-update.component.scss']
})
export class FileUpdateComponent {
  @Output() newItemEvent = new EventEmitter<{file:File, imageUrl:string}[]>();

  fileList: {file:File, imageUrl:string}[] = [{file: null, imageUrl: null}, {file: null, imageUrl: null}, {file: null, imageUrl: null}];
  imageAddUrl = './assets/addProduct.png';

  constructor() { }

  onFileSelected(event){
      let imagePositionNumber = event.target.id.split('-')[1];
      this.fileList[imagePositionNumber].file = event.target.files[0] ;
      let reader = new FileReader();
      reader.readAsDataURL( this.fileList[imagePositionNumber].file);
      reader.onload = (e: any)=>{ this.fileList[imagePositionNumber].imageUrl = e.target.result;}

      this.newItemEvent.emit(this.fileList);
  }
}
