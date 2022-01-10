import { Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  clearClipBoardIntervals = [10000, 60000, 300000, 600000];
  currentSelectedIndex = 0;
  clipboard: Clipboard;

  constructor() {
    this.clipboard = new Clipboard(window.document);
  }

  public copy(value: string) {
    this.clipboard.copy(value);
    if (this.currentSelectedIndex !== -1) {
      this.clearClipBoard();
    }
  }

  public clearClipBoard(time: number = null) {
    setTimeout(
      () => {
        this.clipboard.copy(' ');
      },
      time === null ? this.clearClipBoardIntervals[this.currentSelectedIndex] : time
    );
  }
}
