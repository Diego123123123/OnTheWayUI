export interface IButton {
  name?: string;
  click?: string;
}

export enum TypeOfDialog {
  SUCCESS = 'modal-dialog modal-notify modal-success',
  INFO = 'modal-dialog modal-notify modal-info',
  WARNING = 'modal-dialog modal-notify modal-warning',
  DANGER = 'modal-dialog modal-notify modal-danger'
}

export enum IconOfDialog {
  SUCCESS = 'fa fa-check fa-4x mb-3 animated rotateIn',
  INFO = 'fa fa-info fa-4x mb-3 animated rotateIn',
  WARNING = 'fa fa-exclamation fa-4x mb-3 animated rotateIn',
  DANGER = 'fa fa-close fa-4x mb-3 animated rotateIn'
}

export interface IDialog {
  title: string;
  description: string;
  image?: string;
  btnYes?: string;
  redirectBtnYes?: string;
  btnNo?: string;
  btnClose?: string;
  icon?: string;
  type: string;
  ignoreBackdrop?: boolean;
  keyboardEsc?: boolean;
}

export interface IMapDialog {
  longitude?: number;
  latitude?: number;
  eventPlaceName?: number;
  type: string;
}

export interface IPriceDialog {
  itemId: number;
  prices: Array<any>;
  type: string;
  typePrice: string;
  isAdmin: boolean;
}
