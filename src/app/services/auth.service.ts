import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { verifyMasterPassword } from 'hash-password-manager/masterPassword.js';

import { ProcessStatus } from './../model/processStatus';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn = false;

  login(username: string, password: string): Observable<ProcessStatus> {

    return new Observable(observer => {

      observer.next({ process: 'Verification', complete: false, status: null });

      this.authenticate(password);
      if (this.isLoggedIn) {
        observer.next({ process: 'Verification', complete: true, status: true });
        // TODO: Load vault data here
      }
      else {
        observer.next({ process: 'Verification', complete: true, status: false });
        observer.complete();
      }

      const unsubscribe = () => {};
      return { unsubscribe };
    });
  }

  private authenticate(password: string) {
    // this.isLoggedIn = verifyMasterPassword(password);
    this.isLoggedIn = true;
  }

}
