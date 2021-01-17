import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClipboardService } from '../../../core/services/clipboard.service';
import { VaultItem } from 'src/app/vault/models/vault-item';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Confirm Changes</h2>
  <div mat-dialog-content>Are you sure about the changes you made? Once these changes are made it cannot be undone.</div>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
  </mat-dialog-actions>
  `
})
export class ConformationDialogComponent { }

@Component({
  selector: 'app-vault-item',
  templateUrl: './vault-item.component.html',
  styleUrls: ['./vault-item.component.scss']
})
export class VaultItemComponent implements OnInit {

  vaultItemForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });


  hideUsername = true;
  hidePassword = true;
  readOnly = true;

  @Input() vaultItem: VaultItem;
  @Output() update = new EventEmitter<VaultItem>();
  @Output() add = new EventEmitter<VaultItem>();

  constructor(
    private router: Router,
    private clipboard: ClipboardService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar) { }

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

  ngOnInit() {

    // set initial values
    this.name.setValue(this.vaultItem.name);
    this.password.setValue(this.vaultItem.password);
    this.username.setValue(this.vaultItem.username);
    
    // listen to value changes of name, username and password FormControl
    this.name.valueChanges.subscribe((val) => { this.updateView(this.name, this.vaultItem.name); });
    this.username.valueChanges.subscribe((val) => { this.updateView(this.username, this.vaultItem.username); });
    this.password.valueChanges.subscribe((val) => { this.updateView(this.password, this.vaultItem.password); });

  }

  edit() {
    if (!this.readOnly && this.vaultItemForm.touched) {
      // show dialog
      this.openConfirmationDialog()
    }
    this.readOnly = !this.readOnly;
  }

  updateItem() {
    if (!this.readOnly && this.vaultItemForm.touched) {
      // show dialog
      this.openConfirmationDialog();
    }
    this.updateVaultItemObj();
    this.update.emit(this.vaultItem);
  }

  addItem() {
    if(!this.readOnly && this.vaultItemForm.touched){
      this.openConfirmationDialog();
    }

    this.updateVaultItemObj();
    this.add.emit(this.vaultItem);
  }

  updateVaultItemObj() {
    this.vaultItem.username = this.username.value;
    this.vaultItem.password = this.password.value;
    this.vaultItem.name = this.name.value;
    this.vaultItem.updatedAt = Date.now();
  }

  updateView(f: AbstractControl, prevValue: any) {
    if (f.value !== prevValue)
      {f.setErrors(() => { });}
  }

  copyToClipboard(value: "", msg: string): void {
    this.clipboard.copy(value);
    this.clipboard.clearClipBoard();
    this.openSnackBar(msg, 'Ok');
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }

  undo(){
    this.name.setValue(this.vaultItem.name);
    this.username.setValue(this.vaultItem.username);
    this.password.setValue(this.vaultItem.password);
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConformationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.updateVaultItem();
      }
      else{
        this.undo();
      }
    });
  }

  back() {
    this.router.navigate(['/vault-list']);
  }

}

