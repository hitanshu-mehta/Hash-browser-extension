import { MainBackground } from './main.background';

export class RuntimeBackground{
    private runtime: any;
    
    constructor(private main: MainBackground){
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
        }
    }
}