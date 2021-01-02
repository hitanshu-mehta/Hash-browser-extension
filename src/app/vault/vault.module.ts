import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Components
import {VaultListComponent} from './vault-list/vault-list.component'

// Material Components
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VaultItemComponent } from './vault-item/vault-item.component';

@NgModule({
    imports:[
        CommonModule,
        MatListModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations:[
        VaultListComponent,
        VaultItemComponent
    ],
    exports:[
        VaultListComponent
    ]
})
export class VaultModule {}