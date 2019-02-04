import { Range } from 'ngx-mat-daterange-picker';

export class DateTime {

    //Today = 0, Tomorrow = 1, Weekend = 2//
    dates: any = [{name: 'Today', date: 0},{name: 'Tomorrow', date: 1},{name: 'Weekend', date: 2}];;
    
    //Morning = 1, Noon = 2, Afternoon = 3, Night = 4//
    times: any = [
        {name: 'Morning', time: 1, range: {fromTime:"00:00", toTime:"11:59"}},
        {name: 'Noon', time: 2, range: {fromTime:"12:00", toTime:"13:00"}},
        {name: 'Afternoon', time: 3, range: {fromTime:"13:01", toTime:"18:59"}},
        {name: 'Night', time: 4, range: {fromTime:"19:00", toTime:"23:59"}}
    ];
    max: any;
    today: Date = new Date();
    schedule: any;

    constructor(){
        this.max = new Date(this.today.getFullYear() + 1, this.today.getMonth() + 1, this.today.getDay());
    }

    convertDate(date: Range, time: any){
        var fromDate = date.fromDate;
        var toDate = date.toDate;
        var fromHour = time.fromTime;
        var toHour = time.toTime;
        if(!fromDate && !toDate){fromDate = new Date(); toDate = this.max;}
        if(!time.fromTime && !time.toTime){fromHour = "00:00"; toHour = "23:59";}
        if(!time.fromTime){fromHour = "00:00";}
        if(!time.toTime){toHour = "23:59";}
        fromHour = fromHour.split(':');
        toHour = toHour.split(':');
        var start = new Date(fromDate.getFullYear(),(fromDate.getMonth()),fromDate.getDate(),fromHour[0]-4, fromHour[1]);
        var end = new Date( toDate.getFullYear(), (toDate.getMonth()),toDate.getDate(), toHour[0]-4, toHour[1]);
        let schedule: any = {
            startDate: start.toISOString(),
            finishDate: end.toISOString()
          }
        this.schedule = schedule;
    }

    getDateRange(typeDate = null){
        const backDate = (numOfDays) => {
            const today = new Date();
            return new Date(today.setDate(today.getDate() + numOfDays));
        }
        var myRange: Range = {fromDate:null, toDate:null};
        if(typeDate == 0){myRange = {fromDate:new Date(), toDate: new Date()};}
        if(typeDate == 1){
        const tomorrow = backDate(1);
        myRange = {fromDate:tomorrow, toDate: tomorrow};
        }
        if(typeDate == 2){
        const today1 = new Date();
        const saturday = new Date(today1.setDate(today1.getDate() + (6 + 7 - today1.getDay()) % 7));
        const sunday = new Date(today1.setDate(today1.getDate() + (7 + 7 - today1.getDay()) % 7));
        myRange = {fromDate:saturday, toDate: sunday};
        }
        return myRange;
    }

    getTimeRange(typeTime = null){
        var range = {fromTime:null, toTime:null};
        if(typeTime == 1){range = {fromTime:"00:00", toTime:"11:59"};}
        if(typeTime == 2){range = {fromTime:"12:00", toTime:"13:00"};}
        if(typeTime == 3){range = {fromTime:"13:01", toTime:"18:59"};}
        if(typeTime == 4){range = {fromTime:"19:00", toTime:"23:59"};}
        return range;
    }

    validHour(){
        var time = new Date().toLocaleTimeString();
        var actualTime = Date.parse('01/01/2011 '+ time);
        for(let timer of this.times){
            var start = Date.parse('01/01/2011 '+ timer.range.fromTime);
            var end = Date.parse('01/01/2011 '+ timer.range.toTime);
            if (start < actualTime && actualTime < end){
                return timer;
            }
        }
    return null;
      }
}