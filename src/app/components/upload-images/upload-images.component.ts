import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input} from '@angular/core';
import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service';
import { ImageService } from '../../services/image-service.service';
import { Image } from '../../models/image';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../common/dialog/dialog.model';
import { DialogService } from '../../common/dialog/dialog.service';
import * as $ from 'jquery';

const Config: UploadParams = {
  sas: '?sv=2017-11-09&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-11-22T02:18:32Z&st=2018-11-22T18:18:32Z&spr=https,http&sig=N3L6XE%2BWtkM%2FLijTWc1am074C5uMxwYgtGtMIaoI9aQ%3D',
  storageAccount: 'onthewayservestorage',
  containerName: 'onthewayimages'
};

const allowedExt = /^image\/(jpg|jpeg|png)$/i;

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})

export class UploadImagesComponent implements OnInit {

  config: UploadConfig;
  currentFile: File;
  percent: number;
  nameFile: string;
  imageURL: any;
  enabled: boolean = false;
  @Input() public typeupload;
  @ViewChild('visor') view: ElementRef;
  @ViewChild('file') file: ElementRef;
  @Output('saveImage') saveImage: EventEmitter<Object> = new EventEmitter<Object>();
  constructor(private blob: BlobService, private images: ImageService, private dialogService: DialogService,) {
    this.currentFile = null
    this.config = null
    this.percent = 0
  }

  ngOnInit() {
  }

  updateFiles (file) {
    this.currentFile = null;
    this.nameFile = '';
    this.enabled = false;
    this.view.nativeElement.innerHTML = '';
    if (file.files[0] && allowedExt.exec(file.files[0].type)) {
      this.currentFile = file.files[0];
      this.nameFile = this.currentFile.name.split('.')[0];
      this.enabled = true;
      this.showImage();
    }
  }

  showImage() {
    var visor = new FileReader();
    visor.onload = (ev: any) => {
      console.log(this.view);
      this.view.nativeElement.innerHTML = '<embed src="' + ev.target.result + '" width="100%" >';
    }
    visor.readAsDataURL(this.currentFile);
  }

  async upload () {
    if (this.currentFile !== null) {
      const baseUrl = this.blob.generateBlobUrl(Config, this.currentFile.name);
      this.config = {
        baseUrl: baseUrl,
        blockSize: this.currentFile.size,
        sasToken: Config.sas,
        file: this.currentFile,
        complete: () => {
          if (this.typeupload === 'event'){
            this.saveImage.emit(this.imageURL);
          } else {
            this.saveImage.emit(this.imageURL);
            console.log(this.imageURL.urlImage);
            $('#iconimageid').attr('src', this.imageURL.urlImage);
          }
        },
        error: () => {
          console.log('Error !')
        },
        progress: (percent) => {
          this.percent = percent
        }
      };
      let dialog: IDialog;
      this.uploadBlob().then((result) => {
        let extension = this.currentFile.name.split('.')[1];
        let image: Image = {
            name: this.currentFile.name,
            extension: extension,
            urlImage: baseUrl + Config.sas
          }
          console.log(image);
          this.images.addImage(image).subscribe(response => {
              console.log(response);
              this.imageURL = response;
              dialog = {
                  title: 'Successful',
                  description: 'Your image has been added correctly',
                  btnNo: 'Accept',
                  type: TypeOfDialog.SUCCESS,
                  icon: IconOfDialog.SUCCESS,
                  ignoreBackdrop: result
              };
              this.dialogService.options(dialog);
          }, error => {
              dialog = {
                  title: 'Error',
                  description: 'Your image wasn\'t added',
                  btnNo: 'Accept',
                  type: TypeOfDialog.DANGER,
                  icon: IconOfDialog.DANGER,
                  keyboardEsc: result
              };
              this.dialogService.options(dialog);
          }, () => {
              console.log('finish');
          });
      }).catch(result => {
        dialog = {
          title: 'Error',
          description: 'Your image wasn\'t added into Blob Storage',
          btnNo: 'Accept',
          type: TypeOfDialog.DANGER,
          icon: IconOfDialog.DANGER,
          keyboardEsc: result
        };
        this.dialogService.options(dialog);
      });
    }
  }

  private uploadBlob(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let result = this.blob.upload(this.config);
      if (result) {
        return resolve(true);
      }
      return reject(false);
    });
  }

}
