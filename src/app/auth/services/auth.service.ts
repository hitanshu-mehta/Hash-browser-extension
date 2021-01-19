import { StorageService } from './../../core/services/storage.service';
import { MasterPasswordObj } from '../models/masterpassword';
import { LoadingSpinnerService } from './../../core/services/loading-spinner.service';
import { Observable, of, throwError,from } from 'rxjs';
import { Injectable } from '@angular/core';

import { verifyMasterPassword, setMasterPassword } from 'hash-password-manager/masterPassword.js';
import { Credentials } from './../models/user';
import { User } from '../models/user';


interface WorkerMessage{
  sender: string;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private masterPasswordObj: MasterPasswordObj;

  constructor(private storageService: StorageService){}

  sendToWebWorker(workerMessage: WorkerMessage): Observable<User> | null {
    if(typeof Worker !== undefined){
      const worker = new Worker('../workers/auth.worker', { type: 'module' });

      worker.onmessage = ({ data }) => {
        return of(data);
      };

      switch(workerMessage.sender) {
        case 'login':
          worker.postMessage(workerMessage);
          break;
        case 'new-account':
          worker.postMessage(workerMessage);
      }      
    }
    return null;
  }

  login({username, password}: Credentials): Observable<User>{
    
    // TODO : change apis to only send objects. 
    // The code commented below won't work now because workers don't have access to local storage

    // if(!this.sendToWebWorker({sender:'login',payload:password})){
    //   if(verifyMasterPassword(password)){
    //     return throwError('Invalid Username or Password');
    //   } 
    //   return of({ name: username });
    // }

    if(!verifyMasterPassword(this.masterPasswordObj,password)){
      return throwError('Invalid Username or Password');
    } 
    this.storageService.save('Masterpassword', password);
    return of({ name: username });
  }

  signup({username, password}: Credentials): Observable<{user: User, masterPasswordObj:MasterPasswordObj,masterpassword:string}>{
    this.masterPasswordObj = setMasterPassword(password);
    this.storageService.save('MasterPasswordObj',this.masterPasswordObj);
    this.storageService.save('Masterpassword', password); 
    return of({
      user: {name: username},
      masterPasswordObj:this.masterPasswordObj,
      masterpassword:password
    });
  }

  checkMasterPasswordPresent(): Observable<boolean>{

    if(!this.masterPasswordObj){
      from(this.storageService.get<MasterPasswordObj>('MasterPasswordObj')).subscribe((obj:MasterPasswordObj) => this.masterPasswordObj = obj);
    }

    if(this.masterPasswordObj){
      return of(true);
    }
    return of(false);
  }
  
}
