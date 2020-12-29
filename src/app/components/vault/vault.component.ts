import { Component } from '@angular/core';

import { VaultItem } from '../../model/vault-item';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.scss']
})
export class VaultComponent {

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
