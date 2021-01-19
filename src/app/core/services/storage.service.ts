import { Observable,of } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class StorageService{

    private chromeStorageApi: any;

    constructor(){
        this.chromeStorageApi = chrome.storage.local;
    }

    async get<T>(key: string): Promise<T>{
        return new Promise((resolve)=>{
            this.chromeStorageApi.get(key,(obj:any)=>{
                if(obj != null && obj[key] != null){
                    resolve(obj[key] as T);
                    return;
                }
                resolve(null);
            })
        })
    }

    async save(key: string, obj: any): Promise<any>{
        const keyObj = {[key]:obj};
        return new Promise<void>((resolve)=>{
            this.chromeStorageApi.set(keyObj,()=>{
                resolve();
            })
        })
    }
    
    async remove(key: string): Promise<any> {
        return new Promise<void>((resolve) => {
            this.chromeStorageApi.remove(key, () => {
                resolve();
            });
        });
    }
    
}