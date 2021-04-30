import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesongComponent } from './likesong.component';

describe('LikesongComponent', () => {
  let component: LikesongComponent;
  let fixture: ComponentFixture<LikesongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikesongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
