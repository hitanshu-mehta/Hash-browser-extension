import { FormGroup, FormControl } from '@angular/forms';
import { ConformationDialogComponent } from './../vault-item/vault-item.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { VaultItem } from 'src/app/vault/models/vault-item';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClipboardService } from 'src/app/core/services/clipboard.service';


@Component({
    selector: 'app-new-vault-item',
    templateUrl: './new-vault-item.component.html',
    styleUrls: ['./new-vault-item.component.scss']
})
export class NewVaultItemComponent implements OnInit {

    @Output() saveItem = new EventEmitter<VaultItem>();

    vaultItemForm = new FormGroup({
        name: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl(''),
    });

    hideUsername = true;
    hidePassword = true;

    vaultItem: VaultItem;

    constructor(
        private router: Router,
        private clipboard: ClipboardService,
        public dialog: MatDialog,
        private snackbar: MatSnackBar) { }

    ngOnInit() {
        this.vaultItem = {
            id: '',
            name: '',
            username: '',
            password: '',
            url: '',
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
    }


    // get functions
    get name() {
        return this.vaultItemForm.get('name');
    }

    get username() {
        return this.vaultItemForm.get('username');
    }

    get password() {
        return this.vaultItemForm.get('password');
    }

    back() {
        this.router.navigate(['/vault-list']);
    }

    save() {
        if (this.vaultItemForm.touched) {
            // show dialog
            this.openConfirmationDialog();
        }

    }

    copyToClipboard(value: '', msg: string): void {
        this.clipboard.copy(value);
        this.clipboard.clearClipBoard();
        this.openSnackBar(msg, 'Ok');
    }

    openSnackBar(message: string, action: string) {
        this.snackbar.open(message, action, {
            duration: 2000,
        });
    }

    updateVaultItemObj() {
        this.vaultItem.name = this.name.value;
        this.vaultItem.password = this.password.value;
        this.vaultItem.username = this.username.value;
    }

    openConfirmationDialog() {
        const dialogRef = this.dialog.open(ConformationDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.updateVaultItemObj();
                this.saveItem.emit(this.vaultItem);
                // this.updateVaultItem();
            }
        });
    }

}
