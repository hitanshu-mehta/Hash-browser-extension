import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { VaultItem } from '../../model/vault-item';
import { VaultService } from '../vault.service';

@Component({
  selector: 'app-vault',
  templateUrl: './vault-list.component.html',
  styleUrls: ['./vault-list.component.scss']
})
export class VaultListComponent implements OnInit {

  public vaultItems$: Observable<VaultItem[]>;

  constructor(private route: ActivatedRoute, private vaultService: VaultService) {
  }

  ngOnInit() {
    this.vaultItems$ = this.route.params.pipe(
      switchMap(() => this.vaultService.getVaultItems())
    );
  }

}
