document.addEventListener('DOMContentLoaded',(event)=>{

    let pageHref: string = null;

    const doFillIfNeeded = () => {
        pageHref = window.location.href;
        const msg: any = {
            command: 'bgCollectFormDetails',
            sender:'autofiller'
        };

        chrome.runtime.sendMessage(msg);
    };

    // check whether autofill on page load is enabled or not
    // if enabled then send msg to runtime to start collecting page details

    //TODO(hitanshu): Load settings and check option then call doFillIfNeeded()
    doFillIfNeeded();



});


