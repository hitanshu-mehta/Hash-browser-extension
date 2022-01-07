import { MaterialModule } from './../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayTextComponent } from './display-text/display-text.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [
        DisplayTextComponent,
        LoadingSpinnerComponent,
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
    ],
    exports: [
        DisplayTextComponent,
        LoadingSpinnerComponent,
    ]
})
export class UtilsModule { }
