import { AutofillService } from './../services/autofill.service';
import { MainBackground } from './main.background';

export class RuntimeBackground{
    private runtime: any;
    
    constructor(private main: MainBackground,private autoFillService:AutofillService){
        this.runtime = chrome.runtime;
    }

    async init(){
        if(!this.runtime)
            return;

        chrome.runtime.onMessage.addListener(async (msg:any, sender:any,response:any)=>{
            await this.processMessage(msg, sender,response);
        })
    }


    async processMessage(msg:any,sender:any,response:any){
        switch(msg.command){
            case 'bgCollectFormDetails':
                this.main.collectPageDetails(sender.tab,msg.sender);
                break;
            case 'CollectPageDetailsResponse':
                // take action according to the sender
                switch(msg.sender){
                    case 'autofiller':
                        console.log(this.autoFillService);
                        this.autoFillService.doAutoFillActiveTab({details:msg.details});

                }
        }
    }
}