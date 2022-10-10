import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  message = '';
  userFiles = [];
  private fileToUpload: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.isSuccessful = new URL(window.location.href).searchParams.get('isSuccessful') === 'true';
    this.userService.getUserPhotos().subscribe(
      data => {
        this.userFiles = JSON.parse(data);
      },
      err => {
      }
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    this.userService.uploadPhoto(this.fileToUpload).subscribe(
      data => {
        window.location.href = window.location.href + '?isSuccessful=true';
      },
      err => {
        this.message = err.error.message;
        this.isSuccessful = false;
      }
    );
  }

  removePhoto(id) {
    if (confirm('Are you sure to delete this photo?')) {
      this.userService.removeFile(id).subscribe(
        data => {
          this.message = data;
          this.isSuccessful = true;
          window.location.reload();
        },
        err => {
        }
      );
    }
  }
}
