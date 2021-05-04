import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnghenhieuComponent } from './topnghenhieu.component';

describe('TopnghenhieuComponent', () => {
  let component: TopnghenhieuComponent;
  let fixture: ComponentFixture<TopnghenhieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopnghenhieuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnghenhieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
