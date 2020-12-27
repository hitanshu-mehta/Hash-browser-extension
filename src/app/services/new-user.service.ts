import { merge, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable, Component } from '@angular/core';
import { setMasterPassword } from 'hash-password-manager/masterPassword.js';

// services
import { AuthService } from './auth.service';


// Models
import { ProcessStatus } from './../model/processStatus';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  constructor(private router: Router, private authService: AuthService) { }

  Register(password: string, username: string): Observable<ProcessStatus> {

    return new Observable<ProcessStatus>((observer) => {
      observer.next({ process: 'Registration', complete: false, status: null });

      setMasterPassword(password);
      observer.next({ process: 'Registration', complete: true, status: true });

      observer.next({ process: 'Login', complete: false, status: null });

      observer.complete();
      return { unsubscribe() { } };
    });
  }


}
