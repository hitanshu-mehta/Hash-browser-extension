/* eslint-disable */
document.addEventListener('DOMContentLoaded',()=>{

    const pageDetails: any = [];
    const formData: any = [];

    // get settings from local storage

    chrome.runtime.onMessage.addListener((msg: any, sender: any, sendResponse: Function) => {
        processMessages(msg, sendResponse);
    });

    const processMessages = (msg: any, sendResponse: Function) => {
        // process messages sent from background scripts
    };

});
/* eslint-enable */
