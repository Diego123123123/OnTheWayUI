export interface Event{
    eventId: Number;
    name: string;
    description: string;
    statusId: number;
    categoryId: number;
    siteId: number;
    scheduleId: number;
}

export interface NewEvent{
    name: string;
    description: string;
    categoryId: number;
    siteId: number;
    scheduleId: number;
    imageId: number; 
}

export interface ISingleEvent{
    eventId: number,
    name: string,
    description: string,
    nameStatus: string,
    nameCategory: string,
    nameSite: string,
    latitudeSite: number,
    longitudeSite: number,
    startDate: Date,
    finishDate: Date,
    imageUrl: string,
    favorite?: boolean
}