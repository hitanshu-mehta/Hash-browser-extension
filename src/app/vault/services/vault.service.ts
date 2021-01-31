import { getVault } from './../reducers/index';
import { Store, select } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { EncryptionKeyObj } from './../models/encryption-key';
import { MasterPasswordObj, MasterKeyObj } from './../../auth/models/masterpassword';
import { StorageService } from './../../core/services/storage.service';
import { Injectable } from '@angular/core';
import { VaultItem } from '../models/vault-item';
import { Observable, of, from } from 'rxjs';

import { encryptLoginPassword, decryptLoginPassword } from 'hash-password-manager/passwordUtils.js';

import * as fromAuth from 'src/app/auth/reducers';
import * as fromVault from '../reducers';


@Injectable({
    providedIn: 'root'
})
export class VaultService {

    private masterPasswordObj: MasterPasswordObj;
    private masterPassword: string;
    private vault: VaultItem[] = [];

    constructor(private storageService: StorageService, private store: Store<fromAuth.State | fromVault.State>) {
        store.pipe(select(fromAuth.getMasterpasswordObj)).subscribe((obj) => this.masterPasswordObj = obj);
        store.pipe(select(fromAuth.getMasterpassword)).subscribe((obj) => this.masterPassword = obj);
        // store.pipe(select(fromVault.getVault)).subscribe(vault => this.vault = vault);
        from(this.storageService.get<VaultItem[]>('vault'))
            .subscribe(
                (v: VaultItem[]) => {
                    if (v == null) { this.storageService.save('vault', this.vault); }
                    else {
                        this.vault = v;
                    }
                }
            );
    }


    loadVault(): Observable<VaultItem[]> {

        return from(this.storageService.get<VaultItem[]>('vault')).pipe(
            map((v: VaultItem[]) => this.vault = v),
            switchMap(() => of(this.vault))
        );
    }
    getVaultSize(): number {
        if (this.vault == null) { return 0; }
        return this.vault.length;
    }

    encryptPassword(password: string | EncryptionKeyObj): string | null {
        const { masterKeyHash, masterKeySalt } = this.masterPasswordObj;
        const { encryptionKey, encryptionKeyIv } = this.masterPasswordObj;
        const masterKeyObject = { masterKeyHash, masterKeySalt };
        const encryptionkeyObject = { encryptionKey, encryptionKeyIv };
        return encryptLoginPassword(masterKeyObject, encryptionkeyObject, this.masterPassword, password);
    }

    decryptPassword(eObj: EncryptionKeyObj | string) {
        const { masterKeyHash, masterKeySalt } = this.masterPasswordObj;
        const { encryptionKey, encryptionKeyIv } = this.masterPasswordObj;
        const masterKeyObject = { masterKeyHash, masterKeySalt };
        const encryptionkeyObject = { encryptionKey, encryptionKeyIv };
        return decryptLoginPassword(masterKeyObject, encryptionkeyObject, this.masterPassword, eObj);
    }

    addVaultItem(vaultItem: VaultItem): Observable<VaultItem> {
        return from(this.storageService.get<VaultItem[]>('vault')).pipe(
            map((v: VaultItem[]) => {
                this.vault = v;
                this.vault.push(vaultItem);
                this.storageService.save('vault', this.vault);
            }),
            switchMap(() => of(vaultItem))
        );
    }

    removeVaultItem(vaultItem: VaultItem) {
        // TODO
        return new Observable<any>();
    }

    updateVaultItem(vaultItem: VaultItem): Observable<VaultItem> {
        // TODO
        return new Observable<VaultItem>();
    }

}
