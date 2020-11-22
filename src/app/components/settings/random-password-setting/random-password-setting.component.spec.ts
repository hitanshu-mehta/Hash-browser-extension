import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomPasswordSettingComponent } from './random-password-setting.component';

describe('RandomPasswordSettingComponent', () => {
  let component: RandomPasswordSettingComponent;
  let fixture: ComponentFixture<RandomPasswordSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomPasswordSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomPasswordSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
