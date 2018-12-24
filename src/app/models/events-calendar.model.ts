export interface IEventsCalendar {
    eventId: number;
    nameEvent: string;
    startDate: Date;
    endDate: Date;
    preferenceId?: number;
    average?: number;
    past?: boolean;
    nameSite?: string;
}
