import {Component, OnInit} from '@angular/core';
import {PlayList} from '../play-list';
import {PlayListService} from '../play-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenService} from '../../user/service/authen.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {
  playlist: PlayList = {
    id: 0,
    name: '',
    song: [],
    kindOfMusic: '',
    timeCreate: 0,
    description: '',
    timeUpdate: null,
    view: 1,
  };
  currentUser: any;
  username: any;
  createSuccess = false;

  createPlaylistForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]+$')]],
    kindOfMusic: ['', [Validators.required, Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]+$')]],
    description: ['', Validators.maxLength(300)],
  });

  constructor(private playListService: PlayListService,
              private activatedRoute: ActivatedRoute,
              private authen: AuthenService,
              private router: Router,
              private fb: FormBuilder) {
    this.authen.currentUser.subscribe(value => {
      this.currentUser = value;
      console.log(this.currentUser);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      this.username = paramMap.get('username');
      console.log(this.username);
    });
  }

  createPlayList(): any {
    alert('Tạo mới thành công');
    return this.playListService.createNewPlayList(this.playlist, this.currentUser.username).subscribe(() => {
      console.log(this.playlist);
      this.router.navigate(['/playlist']);
    });
  }

}
