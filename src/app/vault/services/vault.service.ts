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

interface WorkerMessage {
  sender: string;
  payload: any;
}

@Injectable({
  providedIn: 'root',
})
export class VaultService {
  private masterPassword: string;
  private masterKeyObj: MasterKeyObj;
  private encryptionKeyObj: EncryptionKeyObj;
  private vault: VaultItem[] = [];
  private worker: Worker;
  private workerAvailable = true;

  constructor(private storageService: StorageService, private store: Store<fromAuth.State | fromVault.State>) {
    this.store.pipe(select(fromAuth.getMasterpasswordObj)).subscribe((obj: MasterPasswordObj) => {
      this.masterKeyObj = {
        masterKeyHash: obj?.masterKeyHash,
        masterKeySalt: obj?.masterKeySalt,
      };
      this.encryptionKeyObj = {
        encryptionKey: obj?.encryptionKey,
        encryptionKeyIv: obj?.encryptionKeyIv,
      };
    });
    this.store.pipe(select(fromAuth.getMasterpassword)).subscribe((obj) => (this.masterPassword = obj));
    from(this.storageService.get<VaultItem[]>('vault')).subscribe((v: VaultItem[]) => {
      if (v == null) {
        this.storageService.save('vault', this.vault);
      } else {
        this.vault = v;
      }
    });
    this.worker = new Worker('../workers/vault.worker', { type: 'module' });
    if (!this.worker) {
      this.workerAvailable = false;
    }
  }

  async sendToWebWorker(workerMessage: WorkerMessage): Promise<any> {
    return new Promise((resolve) => {
      this.worker.postMessage(workerMessage);
      this.worker.onmessage = ({ data }) => resolve(data);
    });
  }

  loadVault(): Observable<VaultItem[]> {
    return from(this.storageService.get<VaultItem[]>('vault')).pipe(
      map((v: VaultItem[]) => (this.vault = v)),
      switchMap(() => of(this.vault))
    );
  }

  getVaultSize(): number {
    if (this.vault == null) {
      return 0;
    }
    return this.vault.length;
  }

  async encryptPassword(password: string): Promise<EncryptionKeyObj> {
    if (this.workerAvailable) {
      return await this.sendToWebWorker({
        sender: 'encryptPassword',
        payload: {
          masterKeyObj: this.masterKeyObj,
          encryptionKeyObj: this.encryptionKeyObj,
          masterPassword: this.masterPassword,
          password,
        },
      });
    } else {
      return encryptLoginPassword(this.masterKeyObj, this.encryptionKeyObj, this.masterPassword, password);
    }
  }

  decryptPassword(eObj: EncryptionKeyObj | string): Observable<string> {
    return of(decryptLoginPassword(this.masterKeyObj, this.encryptionKeyObj, this.masterPassword, eObj));
  }

  addVaultItem(vaultItem: VaultItem): Observable<VaultItem> {
    let newVI: VaultItem;
    return from(this.storageService.get<VaultItem[]>('vault')).pipe(
      map((v: VaultItem[]) => {
        newVI = JSON.parse(JSON.stringify(vaultItem));
        if (newVI.id === null || newVI.id === '') {
          newVI.id = this.getUId();
        }

        this.vault = v;
        this.vault.push(newVI);
        this.storageService.save('vault', this.vault);
      }),
      switchMap(() => of(newVI))
    );
  }

  getUId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  getVaultItem(id: string): Observable<VaultItem> {
    let toReturn: VaultItem = null;
    return from(this.storageService.get<VaultItem[]>('vault')).pipe(
      map((vault: VaultItem[]) => {
        this.vault = vault;
        const items = this.vault.filter((v) => v.id === id);
        if (items.length === 0) {
          return new Error('Item not found with id:' + id);
        }
        toReturn = items[0];
      }),
      switchMap(() => of(toReturn))
    );
  }

  removeVaultItem(id: string): Observable<VaultItem[]> {
    return from(this.storageService.get<VaultItem[]>('vault')).pipe(
      map((vault: VaultItem[]) => {
        this.vault = vault;
        this.vault = this.vault.filter((v) => v.id !== id);
        this.storageService.save('vault', this.vault);
      }),
      switchMap(() => of(this.vault))
    );
  }
}
