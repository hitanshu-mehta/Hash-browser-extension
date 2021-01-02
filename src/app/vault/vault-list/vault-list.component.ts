import { Component } from '@angular/core';

import { VaultItem } from '../../model/vault-item';

@Component({
  selector: 'app-vault',
  templateUrl: './vault-list.component.html',
  styleUrls: ['./vault-list.component.scss']
})
export class VaultListComponent {

  public vaultItems: Array<VaultItem>;

  constructor() {
    this.vaultItems = [
      {
        username: 'hitanshu_mehta',
        encryptedPassword: '',
        url: 'google.com',
        timestamp: new Date()
      },
      {
        username: 'hitanshu_mehta',
        encryptedPassword: '',
        url: 'insta.com',
        timestamp: new Date()
      },
    ];
  }


}
