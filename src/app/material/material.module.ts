import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';

const MODULES = [
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatChipsModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class MaterialModule {}
