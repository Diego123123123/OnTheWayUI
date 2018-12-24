export enum IconOfAlert {
    SUCCESS = 'check-circle',
    INFO = 'info-circle',
    WARNING = 'warning',
    DANGER = 'times-circle'
}
export enum ColorOfAlert {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    DANGER = 'danger'
}
export interface IAlert {
    icon: IconOfAlert;
    color: ColorOfAlert;
    title: string;
    message: string;
    durationTime: number;
}
