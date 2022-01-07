import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'src/app/core/services/clipboard.service';

@Component({
    selector: 'app-vault-view-input',
    templateUrl: './vault-item-view-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: VaultItemViewInputComponent
        }
    ]
})
export class VaultItemViewInputComponent implements ControlValueAccessor {

    constructor(private clipboard: ClipboardService, private snackbar: MatSnackBar) { }

    @Input() label: string;
    @Input() type: string;
    @Input() value: string;

    @Input() readOnly: boolean;

    @Input() hideButton: boolean;
    @Input() copyButton: boolean;

    hidden = false;
    disabled = false;
    touched = false;
    onChange = (_value: string) => { };
    onTouched = () => { };

    toggleVisibility() {
        this.markAsTouched();
        this.hidden = !this.hidden;
    }

    copyToClipboard(): void {
        this.markAsTouched();
        this.clipboard.copy(this.value);
        this.clipboard.clearClipBoard();
        this.openSnackBar(this.label + ' copied.', 'Ok');
    }

    private openSnackBar(message: string, action: string) {
        this.snackbar.open(message, action, {
            duration: 2000,
        });
    }

    inputChanged(value: string) {
        this.markAsTouched();
        if (!this.disabled) {
            this.value = value;
            this.onChange(this.value);
        }
    }

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(onChange: any): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

}
