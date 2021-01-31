import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromCore from '../../../reducers';
import { HomePageActions } from '../../actions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    appName = 'Hass Passward Manager';
    masterPasswordPresent$: Observable<boolean>;

    constructor(
        private store: Store<fromCore.State>,
    ) { }

    ngOnInit() {
        this.store.dispatch(HomePageActions.checkMasterPasswordPresent());
        this.masterPasswordPresent$ = this.store.pipe(select(fromCore.getMasterPasswordPresent));
    }

}
