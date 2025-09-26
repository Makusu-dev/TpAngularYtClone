import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POTD } from './potd';

describe('POTD', () => {
  let component: POTD;
  let fixture: ComponentFixture<POTD>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [POTD]
    })
    .compileComponents();

    fixture = TestBed.createComponent(POTD);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
