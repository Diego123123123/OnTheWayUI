export interface Event{
  name: string;
  nameCategory: string;
  startDate: Date;
  finishDate: Date;
}

export interface Ticket{
  typeTicket: string;
  price: number;
  numberTicketsEnabled: number;
  numberTicketsSold: number;
  numberTicketsRemaining: number;
  amountObtained: number;
}

export interface UserTicket{
  ownerTicket: string;
  nameAccount: string;
  purchaseDate: Date;
  amountTicket: number;
  stateQR: string;
}

export interface Balance {
  event: Event;
  tickets: Ticket[];
  userTickets: UserTicket[];
}
