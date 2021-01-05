!(function(){

    function registerForm(form){
        console.log(form);
    }

    function fill(){
        for(let i = 0; i < document.forms.length; ++i){
            registerForm(document.forms[i]);
        }

    };

    function collectPageDetails(){
        console.log('collect page detials');
    }


    chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
        if(msg.command == 'collectPageDetails'){

        }
    })


})();