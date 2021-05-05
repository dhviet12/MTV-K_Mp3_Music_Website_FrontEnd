import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {Audio} from '../audio';
import {DataService} from '../../ dataTransmission/data.service';

@Component({
  selector: 'app-play-music',
  templateUrl: './play-music.component.html',
  styleUrls: ['./play-music.component.scss']
})
export class PlayMusicComponent implements OnInit {
  constructor(private data: DataService) {
  }

  totalAudioLength: any;
  currentAudioTime = 0;
  isAudioLoaded = false;
  isAudioPlaying = false;
  isRepeat = false;
  audioVolume = 100;
  isAudioEnded = new Subject();
  isMute = false;
  selectedAudio: Audio = {};
  currentAudioIndex = 0;
  @Input()
  set index(index: any){
    this.currentAudioIndex = index;
  }
  repeatActive = false;
  isError = false;
  @Input() audioList: Audio[] = [];
  @Input() next = true;
  @Input() previous = true;
  @Input() shuffle = true;
  @Input() repeat = true;

  @Output() playEvent = new EventEmitter();
  @Output() pauseEvent = new EventEmitter();
  @Output() nextEvent = new EventEmitter();
  @Output() previousEvent = new EventEmitter();
  @Output() shuffleEvent = new EventEmitter();
  @Output() seekEvent = new EventEmitter();
  @Output() repEvent = new EventEmitter();

  // Access audio player dom
  @ViewChild('audioPlayer', {static: true}) audioPlayer!: ElementRef;

  // bắt sự kiện play
  options(): void {
    // emit play when playing audio
    this.audioPlayer.nativeElement.addEventListener('playing', () => {
    });
    // emit when intial loading of audio
    this.audioPlayer.nativeElement.addEventListener('loadeddata', () => {
      this.isAudioLoaded = true;
      this.getAudioLength();
    });
    // emit time on playing audio
    this.audioPlayer.nativeElement.addEventListener('timeupdate', () => {
      // get current audio time
      this.currentAudioTime = Math.floor(this.audioPlayer.nativeElement.currentTime);
      // check if audio is ended for next song and pass data to componet
      if (this.audioPlayer.nativeElement.ended) {
        this.isAudioEnded.next(true);
      }
    });
    this.audioPlayer.nativeElement.addEventListener('volumechange', () => {
      this.audioVolume = Math.floor(this.audioPlayer.nativeElement.volume * 100);
      if (this.audioVolume === 0) {
        this.isMute = true;
      }
    });

  }

  play(): any {
    // toggle play-pause button
    this.isAudioPlaying = true;
    setTimeout(() => {
      this.audioPlayer.nativeElement.play();
      this.playEvent.emit();
    }, 0);
  }

  pause(): any {
    // toggle play-pause button
    this.isAudioPlaying = false;
    // pause when user click pause button
    setTimeout(() => {
      this.audioPlayer.nativeElement.pause();
      this.pauseEvent.emit();
    }, 0);
  }

  getAudioLength(): any {
    this.totalAudioLength = Math.floor(this.audioPlayer.nativeElement.duration);
  }

  nextAudio(): any {
    if (this.audioList.length - 1 !== this.currentAudioIndex) {
      this.currentAudioIndex += 1;
      this.selectedAudio = this.audioList[this.currentAudioIndex];
      this.getAudioLength();
      if (this.isAudioPlaying) {
        this.play();
      }
      this.nextEvent.emit();
    } else {
      this.pause();
    }
  }

  previousAudio(): any {
    if (this.currentAudioIndex !== 0) {
      this.currentAudioIndex -= 1;
      this.selectedAudio = this.audioList[this.currentAudioIndex];
      this.getAudioLength();
      if (this.isAudioPlaying) {
        this.play();
      }
      this.previousEvent.emit();
    }
  }

  volumeChange(volume: any): any {
    this.audioPlayer.nativeElement.volume = volume.target.value / 100;
  }

  muteAudio(): any {
    if (this.isMute) {
      this.audioPlayer.nativeElement.volume = 0.5;
      this.isMute = false;
    } else {
      this.audioPlayer.nativeElement.volume = 0;
      this.isMute = true;
    }
  }

  initiateAudioPlayer(): any {
    if (this.audioList.length <= 0) {
      this.isError = true;
    } else {
      this.selectedAudio = this.audioList[this.currentAudioIndex];
    }
  }

  repeatAudio(): any {
    this.isRepeat = !this.isRepeat;
    this.repeatActive = !this.repeatActive;
    this.audioPlayer.nativeElement.loop = this.isRepeat;
    this.repEvent.emit();
  }

  seekAudio(seekAudioValue: any): any {
    if (this.audioVolume !== 0) {
      this.isMute = false;
    }
    this.audioPlayer.nativeElement.currentTime = seekAudioValue.target.value;
    this.seekEvent.emit();
  }

  changeSongAdd(id: any): any {
    this.data.changeSong(id);
  }

  onImgError(event: any): any {
    event.target.src = './assets/my_img/test.png';
  }

  ngOnInit(): void {
    this.options();
    this.initiateAudioPlayer();
    // ceck audio is ended for next song
    this.isAudioEnded.subscribe(date => {
      if (!this.isRepeat && this.audioList.length > 0) {
        this.nextAudio();
      }
    });
  }
}
