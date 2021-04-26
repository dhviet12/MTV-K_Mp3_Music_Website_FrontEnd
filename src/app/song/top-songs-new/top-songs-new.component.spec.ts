import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSongsNewComponent } from './top-songs-new.component';

describe('TopSongsNewComponent', () => {
  let component: TopSongsNewComponent;
  let fixture: ComponentFixture<TopSongsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSongsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSongsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
