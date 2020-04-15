import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor(
     private router: Router,
     private modalService: NgbModal
    ) { }

  displayError() {
    this.openPopUp();
    this.router.navigate(['/']);
  }

  async openPopUp() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Your session has expired';
    modalRef.componentInstance.message = 'To Access, please Login again!!';
  }
}
