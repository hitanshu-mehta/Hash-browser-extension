import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { VaultService } from '../vault.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ClipboardService } from './../../services/clipboard.service';
import { VaultItem } from 'src/app/model/vault-item';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

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

  vaultItem$: Observable<VaultItem>

  hideUsername = true;
  hidePassword = true;
  readOnly = true;

  // private prevUsername: string;
  // private prevPassword: string;
  // private prevName: string;

  item: VaultItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vaultService: VaultService,
    private clipboard: ClipboardService,
    public dialog: MatDialog) { }

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
    // Load vault items
    this.vaultItem$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.vaultService.getVaultItem(params.get('id')))
    )

    // set intial values
    this.vaultItem$.subscribe(item => {
      this.name.setValue(item.name);
      this.username.setValue(item.username);
      this.password.setValue(item.password);

      this.item = item;
    });

    // listen to value changes of name, username and password FormControl
    this.name.valueChanges.subscribe((val) => { this.updateView(this.name, this.item.name); })
    this.username.valueChanges.subscribe((val) => { this.updateView(this.username, this.item.username); })
    this.password.valueChanges.subscribe((val) => { this.updateView(this.password, this.item.password); })

  }

  edit() {
    if (!this.readOnly && this.vaultItemForm.touched) {
      // show dialog
      this.openConfirmationDialog()
    }
    this.readOnly = !this.readOnly;
  }

  updateVaultItem() {
    console.log('updated');
  }

  updateView(f: AbstractControl, prevValue: any) {
    if (f.value !== prevValue)
      f.setErrors(() => { });
  }

  copyToClipboard(): void {
    this.clipboard.copy('');
    this.clipboard.clearClipBoard();
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConformationDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateVaultItem();
      }
    });
  }

  back() {
    this.router.navigate(['/vault-list']);
  }

}

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
export class ConformationDialog { }
