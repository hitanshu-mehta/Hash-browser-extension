import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-text',
  templateUrl: './display-text.component.html',
})
export class DisplayTextComponent {
  @Input() text: string;
  @Input() type: string;

  public get class(): string {
    return 'text-center-' + this.type;
  }
}
