import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSongsViewComponent } from './top-songs-view.component';

describe('TopSongsViewComponent', () => {
  let component: TopSongsViewComponent;
  let fixture: ComponentFixture<TopSongsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSongsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSongsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
