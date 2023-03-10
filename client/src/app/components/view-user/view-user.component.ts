import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  userId: any;
  userDetail : any;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.getUserDetailById();
  }

  getUserDetailById() {
    this.userService.get(this.userId).subscribe((data : any) => {
      if (data != null && data.body != null) {
        const resultData = data.body;
        if (resultData) {
          this.userDetail = resultData;
        }
      }
    },
    (error :any)=> { });
  }

}
