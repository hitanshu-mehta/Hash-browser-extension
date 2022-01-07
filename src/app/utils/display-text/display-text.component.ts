import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-display-text',
    templateUrl: './display-text.component.html',
})
export class DisplayTextComponent {

    @Input() text: String;
    @Input() type: String;

    public get class(): String {
        return "text-center-" + this.type;
    }
}
