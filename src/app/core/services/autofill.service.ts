import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutofillService {

  constructor() { }

  async doAutoFillActiveTab(pageDetails: any){

    const autoFillResponse = await this.doAutoFill({pageDetails});

    return autoFillResponse;
  }

  private async doAutoFill(options: any) {
    console.log('doAutoFill Called');
    // Generate fillScipt
    // send tab msg with command 'fillform'
  }

}
