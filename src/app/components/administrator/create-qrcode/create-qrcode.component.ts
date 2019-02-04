import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EventDetailService } from 'src/app/services/event-detail.service';
import { TicketsService } from '../../../services/admin/tickets/tickets.service';
import { PriceService } from '../../../services/price-service.service';
import { UploadParams, UploadConfig, BlobService } from 'angular-azure-blob-service';
var htmlToImage = require('html-to-image');
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import * as $ from 'jquery';
import { ImageService } from '../../../services/image-service.service';
import { Image } from '../../../models/image';
import { IPatch } from 'src/app/models/patch.model';

const Config: UploadParams = {
  sas: '?sv=2017-11-09&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-11-22T02:18:32Z&st=2018-11-22T18:18:32Z&spr=https,http&sig=N3L6XE%2BWtkM%2FLijTWc1am074C5uMxwYgtGtMIaoI9aQ%3D',
  storageAccount: 'onthewayservestorage',
  containerName: 'onthewayimages'
};

@Component({
  selector: 'app-create-qrcode',
  templateUrl: './create-qrcode.component.html',
  styleUrls: ['./create-qrcode.component.scss']
})
export class CreateQrcodeComponent implements OnInit {

  public ticketId: any;
  public client: any;
  public myAngularxQrCode: string = null;
  event: any = {};
  eventName: string = '';
  priceTicket: any = {};
  ticket: any = {};
  dateTime: any = [];
  available: boolean = true;
  config: UploadConfig;
  imageURL: any;
  percent: number;
  currentFile: File;
  
  constructor (private route: ActivatedRoute, private usersService: UserService, private price: PriceService, 
    private eventService: EventDetailService, private ticketService: TicketsService,
    private blob: BlobService, private images: ImageService) {
    this.ticketId = this.route.snapshot.paramMap.get('ticketId');
    this.currentFile = null
    this.config = null
    this.percent = 0
    this.myAngularxQrCode = 'Ticket Disabled';
  }

  ngOnInit() {
    this.ticketService.getTicketById(Number(this.ticketId)).subscribe(data => {
      if(data['customerId'] == sessionStorage.getItem('userId') || sessionStorage.getItem('role') == '1'
      || sessionStorage.getItem('role') == '2'){
        this.ticket = data;
        this.myAngularxQrCode = "https://otw-soft07.firebaseapp.com/customer/" + String(this.ticketId);
        this.eventService.getEventDetail(data['eventId']).subscribe(response => {
          this.eventName = response['name'];
          this.price.getPrice(this.ticket.priceId).subscribe(priceResp => {
            this.event = response;
            this.dateTime = response['startDate'].split('T');
            this.priceTicket = priceResp;
            if(data['imageId'] == 0){
              this.captureScreen();
            }
          });
        });
      }
      else{this.available = false;}
    });
  }

  public captureScreen() {
    var data = document.getElementById('contentToConvert');  
    htmlToImage.toPng(data).then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      sessionStorage.setItem('dataSrc', dataUrl);
    })
    this.upload();
  }

  public upload () { 
      this.currentFile = this.dataURLtoFile('myTicket' + String(this.ticketId));
      const baseUrl = this.blob.generateBlobUrl(Config, 'myTicket' + String(this.ticketId));
      this.config = {
        baseUrl: baseUrl,
        blockSize: this.currentFile.size,
        sasToken: Config.sas,
        file: this.currentFile,
        complete: () => {
        },
        error: () => {
          console.log('Error !')
        },
        progress: (percent) => {
          this.percent = percent
        }
      };
      this.uploadBlob().then((result) => {
        let image: Image = {
            name: 'myTicket' + String(this.ticketId),
            extension: 'png',
            urlImage: baseUrl + Config.sas
          }
          this.images.addImage(image).subscribe(response => {
              this.imageURL = response;
              this.ticket.imageId = response['imageId'];
              this.editTicket(response['imageId']);
          }, error => {
          }, () => {
              console.log('finish');
          });
      }).catch(result => {

      });
    }
  
    dataURLtoFile(filename) {
      var dataurl = sessionStorage.getItem('dataSrc'); 
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
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

  private editTicket(imageId){
    sessionStorage.removeItem('dataSrc');
    let patchTicketOperations = new Array<IPatch>();
    let patchImage: IPatch = {
      op: 'replace',
      path: '/imageId',
      value: imageId,
    };
    patchTicketOperations.push(patchImage);    
    this.ticketService.patch(this.ticketId + '/imageQr', patchTicketOperations).subscribe(() => {});
  }

  public sendEmail(){
    if(this.ticket.imageId == 0){
      this.captureScreen();
    }
    this.editTicket(this.ticket.imageId);
  }
    
    /*html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      console.log(contentDataURL);
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  */

}
