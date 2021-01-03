import { Injectable } from '@angular/core';
import { VaultItem } from '../model/vault-item';
import { VAULT } from './mock-vault';

import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VaultService {

  storeVaultItem() {

  }

  getVaultItems(): Observable<VaultItem[]> {
    return of(VAULT);
  }

  getVaultItem(id: number | string) {
    return this.getVaultItems().pipe(
      // (+) before `id` turns the string into a number
      map((vaultItems: VaultItem[]) => vaultItems.find(vaultItem => vaultItem.id === +id))
    );
  }

}
