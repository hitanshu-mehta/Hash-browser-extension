const msg:any = {
    command: 'bgCollectFormDetails',
    sender:'autofiller'
}

if(document.readyState !== 'loading' ){
    chrome.runtime.sendMessage(msg);
}
else{
    document.addEventListener('DOMContentLoaded',(event)=>{
        chrome.runtime.sendMessage(msg);
    });
}


