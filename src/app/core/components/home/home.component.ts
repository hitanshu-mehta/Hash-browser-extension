import { AuthService } from './../../../auth/services/auth.service';
import { Store, select } from '@ngrx/store';
import { Component } from '@angular/core';
import * as fromCore from '../../reducers';
import { HomePageActions } from '../../actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  appName = 'Hass Passward Manager';
  masterPasswordPresent : boolean;

  constructor(
    private store: Store<fromCore.State>,
    private authService: AuthService
    ) { 
      this.authService.checkMasterPasswordPresent().subscribe((v) => {console.log(v);this.masterPasswordPresent = v});
      // TODO
      // this.store.dispatch(HomePageActions.checkMasterPasswordPresent());
      // this.store.pipe(select(fromCore.getMasterPasswordPresent)).subscribe((v)=> this.masterPasswordPresent = v)
    }
  

}
