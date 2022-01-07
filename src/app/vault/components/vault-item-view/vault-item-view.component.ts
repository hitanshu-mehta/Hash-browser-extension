import { Router } from '@angular/router';
import { VaultItem } from 'src/app/vault/models/vault-item';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-vault-item-view',
    templateUrl: './vault-item-view.component.html',
})
export class VaultItemViewComponent {

    constructor(private router: Router) { }

    @Input() vaultItem: VaultItem;

    vaultItemForm = new FormGroup({
        name: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl(''),
        url: new FormControl(''),
    });

    edit() {
        // TODO
    }

    back() {
        this.router.navigate(['/vault-list']);
    }

}