import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPlaylistNewComponent } from './top-playlist-new.component';

describe('TopPlaylistNewComponent', () => {
  let component: TopPlaylistNewComponent;
  let fixture: ComponentFixture<TopPlaylistNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPlaylistNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPlaylistNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
