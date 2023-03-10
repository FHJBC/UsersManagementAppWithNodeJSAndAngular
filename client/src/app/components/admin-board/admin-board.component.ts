import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-board-admin',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
  closeResult = '';
  usersList?: User[];
  content?: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  async getAllUsers() {
    this.userService.getAll().subscribe({
      next: (data: any) => {
        this.usersList = data?.body;
      },
      error: (err: any) => {
        if (err.status == 404) {
            if(err.error && err.error.message){
              this.usersList = [];
            }
        }

        this.content = JSON.parse(err.error).message;
      }
    });
  }

  AddUser() {
    this.router.navigate(['AddUser']);
  }

  deleteUserConfirmation(user: any) {
    this.modalService.open(MODALS['deleteModal'], { ariaLabelledBy: 'modal-basic-title'})
      .result.then(
        (result: any) => {
          this.userService.delete(user.id).subscribe(
            {
              next: (data: any) => {
                if (data != null && data.body != null) {
                  const resultData = data.body;
                  if (resultData != null && resultData.isSuccess) {
                    this.toastr.success(resultData.message);
                    this.getAllUsers();
                  }
                }
              },
              error: (err: any) => {
                if (err.status == 404) {
                    if(err.error && err.error.message){
                      this.usersList = [];
                    }
                  }
                this.content = JSON.parse(err.error).message;
              }
            }
          );
        },
        (reason: any) => {}
      );
  }
}
