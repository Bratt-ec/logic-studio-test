import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgValidation } from './msg-validation';

describe('MsgValidation', () => {
  let component: MsgValidation;
  let fixture: ComponentFixture<MsgValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgValidation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgValidation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
