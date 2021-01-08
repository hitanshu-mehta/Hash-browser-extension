import { AutofillService } from './../services/autofill.service';
import { RuntimeBackground } from './runtime.background';

export class MainBackground{

    private rumtimeBackGround: RuntimeBackground;
    private autofillService: AutofillService;

    constructor(){
        this.autofillService = new AutofillService();

        this.rumtimeBackGround = new RuntimeBackground(this,this.autofillService);
    }

    async bootstrap(){
        await this.rumtimeBackGround.init();
    }

    collectPageDetails(tab:any, sender:string){
        if(tab == null || !tab.id)
            return;
        
        chrome.tabs.sendMessage(tab.id,{
            command:'collectPageDetails',
            sender: sender
        });
    }
}