import { IPatch } from '../../../models/patch.model';
import { DialogService } from '../../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { SiteService } from './../../../services/site.service';
import { AppError } from '../../../common/errors/app-error';
import { HttpClient} from '@angular/common/http';


export class PatchSite {

  imageId: any;
  markedLat: any;
  markedLng: any;
  lat: any;
  lng: any;
  site: any;
  nameSite: any;
  descriptionSite: any;
  imageUrl: any;
  siteService: any;
  dialogService: DialogService;

  constructor(siteService, dialogService) {
    this.siteService = siteService;
    this.dialogService = dialogService;
  }

  consumeSite(siteId) {
    this.siteService.getSiteDetail(Number(siteId)).subscribe(response => {
      this.site = response;
      this.lat = this.site.latitude;
      this.lng = this.site.longitude;
      this.markedLat = this.site.latitude;
      this.markedLng = this.site.longitude;
      this.nameSite = this.site.name;
      this.descriptionSite = this.site.description;
      this.imageUrl = this.site.imageUrl;
    }, (error: AppError) => {
      console.log("entro a esta section de error", error);
    });
  }

  public patchInformationOfSite(modal, name, desc) {
    var patchOperations = new Array<IPatch>();
    let nameSiteNow = this.site.name;
    let descriptionSiteNow = this.site.description;
    if (nameSiteNow !== name) {
      let patchNamePlace: IPatch = {
        op: 'replace',
        path: '/name',
        value: name,
      };
      patchOperations.push(patchNamePlace);
    }
    if (descriptionSiteNow !== desc) {
      let patchDescriptionPlace: IPatch = {
        op: 'replace',
        path: '/description',
        value: desc,
      };
      patchOperations.push(patchDescriptionPlace);
    }
    this.checkPatchSite(patchOperations, modal);
  }

  public PatchImageOfSite(modal) {
    var patchOperations = new Array<IPatch>();
    if (this.imageId !== 0) {
      let patchImagePlace: IPatch = {
        op: 'replace',
        path: '/imageId',
        value: this.imageId,
      };
      patchOperations.push(patchImagePlace);
    }
    this.checkPatchSite(patchOperations, modal);
  }

  public patchLocationSite(modal) {
    var patchOperations = new Array<IPatch>();
    if (this.lat !== this.markedLat) {
      let patchLatitudePlace: IPatch = {
        op: 'replace',
        path: '/latitude',
        value: this.markedLat,
      };
      patchOperations.push(patchLatitudePlace);
    }
    if (this.lng !== this.markedLng) {
      let patchLongitudePlace: IPatch = {
        op: 'replace',
        path: '/longitude',
        value: this.markedLng,
      };
      patchOperations.push(patchLongitudePlace);
    }
    this.checkPatchSite(patchOperations, modal);
  }

  private checkPatchSite(patchOperations, modal) {
    if (patchOperations.length > 0) {
      this.patchSiteHelp(patchOperations, modal);
      return;
    }
  }

  private patchSiteHelp(patchOperations, modal) {
    let dialog: IDialog;
    this.siteService.patchSite(this.site.siteId, patchOperations).subscribe(response => {
      dialog = {
        title: 'Successful',
        description: 'Your Site has been edited',
        btnNo: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        ignoreBackdrop: true
      };
      modal.hide();
      this.dialogService.options(dialog);
    }, error => {
      dialog = {
        title: 'Error',
        description: 'Your Site wasn\'t edited',
        btnNo: 'Accept',
        type: TypeOfDialog.DANGER,
        icon: IconOfDialog.DANGER,
        keyboardEsc: true
      };
      this.dialogService.options(dialog);
    }, () => {
    });
  }
}
