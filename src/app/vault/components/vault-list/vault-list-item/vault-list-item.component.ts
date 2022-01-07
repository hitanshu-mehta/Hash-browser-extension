import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-vault-list-item',
    templateUrl: './vault-list-item.component.html',
})
export class VaultListItemComponent {
    @Input() name: string;
    @Input() username: string;
    @Input() id: string;
}
