export interface ITicketEvent {
    TicketId: number,
    CustomerName: string,
    State: number,
    ImageId: number;
    EventId: number;
    EventImageUrl: string,
    EventName: string,
    EventDescription: string,
    EventStatusName: string,
    EventCategory: string,
    PriceAmount: any,
    PriceMoney: string,
    PriceNameSiteInEvent: string,
}