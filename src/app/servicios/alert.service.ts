import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  deleteAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question', confirmButtonText?: string ){
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText || 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }


  successAlert(title: string, text: string) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 2500
    });
  }

  errorAlert(title: string, text: string) {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      //footer: '<a href="#">Why do I have this issue?</a>'
    });
  }

  infoAlert(title: string, text: string) {
    Swal.fire({
      icon: "info",
      title: title,
      text: text,
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }

  warningAlert(title: string, text: string) {
    Swal.fire({
      icon: "warning",
      title: title,
      text: text,
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
  
}
