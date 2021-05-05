import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopthinhhanhComponent } from './topthinhhanh.component';

describe('TopthinhhanhComponent', () => {
  let component: TopthinhhanhComponent;
  let fixture: ComponentFixture<TopthinhhanhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopthinhhanhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopthinhhanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
