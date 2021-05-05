import {Component, OnInit} from '@angular/core';
import {DataService} from './shared/ dataTransmission/data.service';
import {Audio} from './shared/audio/audio';
import {Router} from '@angular/router';
import {ISong} from './song/isong';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private data: DataService, private router: Router) {
  }

  title = 'web-mp3-mtvk-fe';

  ngOnInit(): void {
    this.router.navigate(['/songs']);
  }
}
