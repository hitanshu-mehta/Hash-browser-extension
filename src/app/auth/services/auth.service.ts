import { from, Observable, of } from 'rxjs';
import { StorageService } from './../../core/services/storage.service';
import { MasterPasswordObj } from '../models/masterpassword';
import { Injectable } from '@angular/core';

import { verifyMasterPassword, setMasterPassword } from 'hash-password-manager/masterPassword.js';
import { Credentials } from './../models/user';
import { User } from '../models/user';
import { map, switchMap } from 'rxjs/operators';
import { VaultItem } from 'src/app/vault/models/vault-item';

interface WorkerMessage {
    sender: string;
    payload: any;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private masterPasswordObj: MasterPasswordObj;
    private worker: Worker | null;
    private workerAvailable = true;

    constructor(private storageService: StorageService) {
        this.worker = new Worker('../workers/auth.worker', { type: 'module' });
        if (!this.worker) { this.workerAvailable = false; }
    }

    async sendToWebWorker(workerMessage: WorkerMessage): Promise<any> {

        return new Promise((resolve) => {
            this.worker.postMessage(workerMessage);
            this.worker.onmessage = ({ data }) => resolve(data);
        });
    }

    async login({ username, password }: Credentials): Promise<User> {

        let isVerified: boolean;

        if (this.workerAvailable) {
            isVerified = await this.sendToWebWorker(
                {
                    sender: 'login',
                    payload: {
                        password,
                        masterPasswordObj: this.masterPasswordObj,
                    }
                });
        }
        else { isVerified = verifyMasterPassword(this.masterPasswordObj, password); }

        return new Promise((resolve, reject) => {
            if (!isVerified) { reject('Invalid username or Password'); }
            resolve({ name: username });
        });
    }

    async signup({ username, password }: Credentials):
        Promise<{ user: User; masterPasswordObj: MasterPasswordObj; masterpassword: string }> {

        let signupResult = { user: { name: username }, masterPasswordObj: null, masterpassword: password };

        if (this.workerAvailable) {
            await this.sendToWebWorker({ sender: 'signup', payload: { password } })
                .then((obj) => {
                    this.masterPasswordObj = obj;
                    this.storageService.save('MasterPasswordObj', obj);
                    signupResult = { ...signupResult, masterPasswordObj: obj };
                });
        }
        else {
            this.masterPasswordObj = setMasterPassword(password);
            this.storageService.save('MasterPasswordObj', this.masterPasswordObj);
            signupResult = { ...signupResult, masterPasswordObj: this.masterPasswordObj };
        }

        return signupResult;
    }

    async checkMasterPasswordPresent(): Promise<boolean> {

        if (!this.masterPasswordObj) {
            await this.storageService.get<MasterPasswordObj>('MasterPasswordObj')
                .then((obj: MasterPasswordObj) => {
                    this.masterPasswordObj = obj;
                });
        }
        if (this.masterPasswordObj === null) {
            return false;
        }
        return true;
    }

    loadMasterPasswordObj() : Observable<MasterPasswordObj> {
        return from(this.storageService.get<MasterPasswordObj>('MasterPasswordObj')).pipe(
            map((obj: MasterPasswordObj) => this.masterPasswordObj = obj),
            switchMap(() => of(this.masterPasswordObj))
        );
    }

}
