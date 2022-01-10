import { Component } from '@angular/core';

export interface Setting {
  index: number;
  title: string;
  active: boolean;
  route: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  settings: Setting[];
  currentActiveSettingIndex = -1;

  constructor() {
    this.settings = [
      {
        index: 0,
        title: 'Change Master Password',
        active: false,
        route: '',
      },
      {
        index: 1,
        title: 'Generate Random Password',
        active: false,
        route: '/password-generator-settings',
      },
    ];
  }

  onClick(index: number): void {
    if (this.currentActiveSettingIndex !== -1) {
      this.settings[this.currentActiveSettingIndex].active = false;
    }
    this.settings[index].active = true;
    this.currentActiveSettingIndex = index;
  }
}
