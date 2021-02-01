/* eslint-disable */
/// <reference lib="webworker" />
/* eslint-enable */
import { encryptLoginPassword } from 'hash-password-manager/passwordUtils.js';


const processMessage = ({ sender, payload }): any => {
    switch (sender) {
        case 'encryptPassword':
            return encryptLoginPassword(
                payload.masterKeyObj,
                payload.encryptionKeyObj,
                payload.masterPassword,
                payload.password);
        case 'decryptPassword':
        // return setMasterPassword(payload.password);
    }

};

addEventListener('message', ({ data }) => {
    const response = processMessage(data);
    postMessage(response);
});
