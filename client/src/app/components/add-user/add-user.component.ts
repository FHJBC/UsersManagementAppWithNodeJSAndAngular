import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
// import { HttpProviderService } from '../service/http-provider.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: userForm = new userForm();

  @ViewChild("userForm")
  userForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  AddUser(isValid: any) {

    this.isSubmitted = true;

    if (isValid) {
      this.userService.create(this.addUserForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            const resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }

}

export class userForm {
  FirstName: string = "";
  LastName: string = "";
  UserName: string = "";
  Password: string = "";
}
