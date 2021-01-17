import { ComponentRef, Injectable } from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';



@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private component: ComponentRef<LoadingSpinnerComponent>;
  private overlayRef: OverlayRef = null;

  constructor(private overlay: Overlay) { }

  // @returns {OverLayRef} returns OverlayRef with spinner component attached using component Portal
  public show(message = ''): void {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }


    // Disable All click events on the page
    document.addEventListener('click', this.disableAllClickEvents, true);

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(LoadingSpinnerComponent);
    this.component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    this.component.instance.message = message;

  }

  public hide(): void {
    // Enable click events on the page
    document.removeEventListener('click', this.disableAllClickEvents, true);

    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  public changeMessage(message: string): void {
    this.component.instance.message = message;
  }

  private disableAllClickEvents(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }

}
