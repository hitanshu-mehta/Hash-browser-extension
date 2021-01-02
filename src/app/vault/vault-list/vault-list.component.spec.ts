import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultListItemComponent } from './vault.component';

describe('VaultComponent', () => {
  let component: VaultListItemComponent;
  let fixture: ComponentFixture<VaultListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaultListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
