import { RuntimeBackground } from './runtime.background';

export class MainBackground{

    private rumtimeBackGround: RuntimeBackground;

    constructor(){
        this.rumtimeBackGround = new RuntimeBackground(this);
    }

    async bootstrap(){
        await this.rumtimeBackGround.init();
    }

    collectPageDetails(tab:any, sender:string){
        if(tab == null || !tab.id)
            return;
        console.log(tab);
        
        chrome.tabs.sendMessage(tab.id,{
            command:'collectPageDetails',
            sender:'main-background'
        });
    }
}