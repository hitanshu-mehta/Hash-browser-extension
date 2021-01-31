/* eslint-disable */
/// <reference lib="webworker" />
/* eslint-enable */

import { verifyMasterPassword, setMasterPassword } from 'hash-password-manager/masterPassword.js';

const processMessage = ({ sender, payload }): any => {
    switch (sender) {
        case 'login':
            return verifyMasterPassword(payload.masterPasswordObj, payload.password);
        case 'signup':
            return setMasterPassword(payload.password);
    }

};

addEventListener('message', ({ data }) => {
    const response = processMessage(data);
    postMessage(response);
});





