import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StrengthMeterComponent } from './strength-meter/strength-meter.component';


@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[
        StrengthMeterComponent
    ],
    exports:[
        StrengthMeterComponent
    ]
})
export class StrongPasswordModule {}