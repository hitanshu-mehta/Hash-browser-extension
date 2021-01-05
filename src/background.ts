import { MainBackground } from './app/background/main.background';


const hash = new MainBackground();
hash.bootstrap().then(()=>{

});
// chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
//     if(msg.command === 'fillForm'){

//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//                 console.log(response.farewell);
//             });
//         });
//     }
// })
