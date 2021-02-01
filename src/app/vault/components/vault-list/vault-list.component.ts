import { Observable } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VaultItem } from '../../models/vault-item';


@Component({
    selector: 'app-vault-list',
    templateUrl: './vault-list.component.html',
    styleUrls: ['./vault-list.component.scss']
})
export class VaultListComponent {

    @Input() vaultItems: VaultItem[];
}
