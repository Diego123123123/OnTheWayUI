export interface IEvent {
    eventId : number;
    name: string;
    description: string;
    nameStatus: string;
    nameCategory: string;
    nameSite: string;
    latitudeSite: number;
    longitudeSite: number;
    startDate: Date;
    finishDate: Date;
    imageUrl: string;
    favorite?: boolean;
    average?: number;
}