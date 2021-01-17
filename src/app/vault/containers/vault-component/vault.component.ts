import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VaultItem } from './../../models/vault-item';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromVault from '../../reducers';
import { VaultActions } from '../../actions';


@Component({
    selector:'app-vault',
    templateUrl:'./vault.component.html',
    styleUrls: ['./vault.component.scss']
})
export class VaultComponent implements OnInit{

    vaultItems$: Observable<VaultItem[]>;

    constructor(private store: Store<fromVault.State>){
        this.vaultItems$ = store.pipe(select(fromVault.getVault));
    }

    ngOnInit(){
        this.store.dispatch(VaultActions.loadVault());
    }

    addVaultItem(){
        this.store.dispatch(VaultActions.addVaultItem());
    }
}