import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Components
import { VaultListComponent } from './vault-list/vault-list.component';

// Material Components
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { VaultItemComponent, ConformationDialogComponent } from './vault-item/vault-item.component';
import { VaultRoutingModule } from './vault-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        CommonModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        VaultRoutingModule
    ],
    declarations: [
        VaultListComponent,
        VaultItemComponent,
        ConformationDialogComponent
    ],
    exports: [
        VaultListComponent,
        VaultItemComponent,
        ConformationDialogComponent
    ]
})
export class VaultModule { }
