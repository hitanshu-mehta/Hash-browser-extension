import { VaultActions } from 'src/app/vault/actions';
import { Router, ActivatedRoute } from '@angular/router';
import { VaultItem } from 'src/app/vault/models/vault-item';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromVault from '../../reducers'

@Component({
    selector: 'app-vault-item-view',
    templateUrl: './vault-item-view.component.html',
})
export class VaultItemViewComponent {
    @Input() vaultItem: VaultItem = {
        name: '', username: '',
        id: '',
        password: '',
        url: '',
        createdAt: 0,
        updatedAt: 0,
    };

    constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromVault.State>) { }


    vaultItemForm = new FormGroup({
        name: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl(''),
        url: new FormControl(''),
    });

    // getter functions
    get name() {
        return this.vaultItemForm.get('name');
    }

    get username() {
        return this.vaultItemForm.get('username');
    }

    get password() {
        return this.vaultItemForm.get('password');
    }

    get url() {
        return this.vaultItemForm.get('url');
    }

    save() {
        let toAddVaultItem: VaultItem = {
            ...this.vaultItem,
            id: null,
            name: this.name.value,
            username: this.username.value,
            password: this.password.value,
            url: this.url.value,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }

        this.store.dispatch(VaultActions.addVaultItem({ vaultItem: toAddVaultItem }));
    }

    back() {
        this.router.navigate(['/vault-list']);
    }

}
