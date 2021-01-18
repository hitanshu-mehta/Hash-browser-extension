import { addVaultItem } from './../actions/vault.actions';
import { Injectable } from '@angular/core';
import { VaultItem } from '../models/vault-item';
import { VAULT } from '../mock-vault';

import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VaultService {

  getVaultItems(): Observable<VaultItem[]> {
    return of(VAULT);
  }

  loadVault(): Observable<VaultItem[]> {
    // TODO
    
    return of(VAULT);
    return new Observable<VaultItem[]>();
  }

  addVaultItem(vaultItem: VaultItem): Observable<VaultItem>{
    // TODO
    return new Observable<VaultItem>();
  }

  removeVaultItem(vaultItem: VaultItem){
    // TODO
    return new Observable<any>()
  }

  updateVaultItem(vaultItem: VaultItem):Observable<VaultItem> {
    // TODO
    return new Observable<VaultItem>();
  }

}
