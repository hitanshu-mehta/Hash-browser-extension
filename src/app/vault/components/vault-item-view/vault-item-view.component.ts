import { LoadingSpinnerService } from './../../../core/services/loading-spinner.service';
import { VaultStatus } from './../../reducers/vault.reducer';
import { VaultActions } from 'src/app/vault/actions';
import { Router, ActivatedRoute } from '@angular/router';
import { VaultItem } from 'src/app/vault/models/vault-item';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromVault from '../../reducers';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-vault-item-view',
    templateUrl: './vault-item-view.component.html',
})
export class VaultItemViewComponent implements OnInit, OnDestroy {
    @Input() vaultItem$: Observable<VaultItem> = this.store.pipe(select(fromVault.getCurrentVaultItem));
    status$: Observable<VaultStatus> = this.store.pipe(select(fromVault.getVaultStatus));
    actionSubscription: Subscription;

    vaultItemForm = new FormGroup({
        name: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl(''),
        url: new FormControl(''),
    });

    private currentVaultId: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromVault.State>,
        private spinner: LoadingSpinnerService,
        private snackbar: MatSnackBar) { }

    ngOnInit(): void {
        this.status$.subscribe(s => {
            switch (s) {
                case VaultStatus.loadingItem:
                    this.spinner.show('Loading vault item.');
                    break;
                case VaultStatus.addingItem:
                    this.spinner.show('Adding vault item.');
                    break;
                case VaultStatus.itemLoaded:
                    this.spinner.hide();
                    this.openSnackBar('Vault item loaded', 'Ok', 2000);
                    break;
                case VaultStatus.itemAdded:
                    this.spinner.hide();
                    this.openSnackBar('Vault item added.', 'Ok', 2000);
                    break;
                case VaultStatus.failedLoadingItem:
                    this.spinner.hide();
                    this.back();
                    break;
                case VaultStatus.failedAddingItem:
                    this.spinner.hide();
                    break;
            }
        });

        this.vaultItem$.subscribe(v => {
            this.currentVaultId = v?.id;
            if (v) {
                this.updateForm(v);
            }
            else {
                this.updateForm({
                    name: '',
                    username: '',
                    password: '', url: '',
                    id: '',
                    createdAt: 0,
                    updatedAt: 0
                });
            }
        });
        this.actionSubscription = this.route.paramMap.pipe(
            map(params => VaultActions.getVaultItem({ id: params.get('id') }))
        ).subscribe(this.store);
    }

    ngOnDestroy(): void {
        if (this.actionSubscription) { this.actionSubscription.unsubscribe(); }
    }

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
        const toAddVaultItem: VaultItem = {
            id: this.currentVaultId,
            name: this.name.value,
            username: this.username.value,
            password: this.password.value,
            url: this.url.value,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        if (this.currentVaultId) { this.store.dispatch(VaultActions.updateVaultItem({ vaultItem: toAddVaultItem })); }
        else { this.store.dispatch(VaultActions.addVaultItem({ vaultItem: toAddVaultItem })); }
    }

    updateForm(vaultItem: VaultItem) {
        this.vaultItemForm.setValue({
            name: vaultItem.name,
            username: vaultItem.username,
            password: vaultItem.password,
            url: vaultItem.url
        });
    }

    back() {
        this.router.navigate(['/vault-list']);
    }

    private openSnackBar(message: string, action: string, timeout: number) {
        this.snackbar.open(message, action, {
            duration: timeout,
        });
    }

}
