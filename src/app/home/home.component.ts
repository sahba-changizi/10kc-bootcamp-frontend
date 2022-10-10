import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  userFiles: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllPhotos().subscribe(
      data => {
        this.userFiles = JSON.parse(data);
      },
      err => {
      }
    );
  }
}
