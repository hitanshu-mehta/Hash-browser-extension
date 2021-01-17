/* eslint-disable */
/// <reference lib="webworker" />
import { verifyMasterPassword } from 'hash-password-manager/masterPassword.js';

addEventListener('message', ({ data }) => {
  const response = processMessage(data);
  console.log('in worker');
  postMessage(response);
});

function processMessage({sender,password}): any {
  switch(sender){
    case 'login':
      return verifyMasterPassword(password);
  }

}

/* eslint-enable */


