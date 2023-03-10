import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  editUserForm: UserForm = new UserForm();

  @ViewChild("UserForm")
  userForm!: NgForm;

  isSubmitted: boolean = false;
  userId: any;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.getUserDetailById();
  }

  getUserDetailById() {
    this.userService.get(this.userId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        const resultData = data.body;
        if (resultData) {
          this.editUserForm.Id = resultData.id;
          this.editUserForm.FirstName = resultData.firstname;
          this.editUserForm.LastName = resultData.lastname;
          this.editUserForm.UserName = resultData.username;
        }
      }
    },
      (error: any) => { });
  }

  EditUser(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.userService.update(this.userId, this.editUserForm).subscribe(async (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async (error: any) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class UserForm {
  Id: number = 0;
  FirstName: string = "";
  LastName: string = "";
  UserName: string = "";
}
