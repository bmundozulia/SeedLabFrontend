import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // deleteAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question', confirmButtonText?: string ){
  //   Swal.fire({
  //     title: title,
  //     text: text,
  //     icon: icon,
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: confirmButtonText || 'OK'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "Your file has been deleted.",
  //         icon: "success"
  //       });
  //     }
  //   });
  // }

  successAlert(title: string, text: string)  {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      customClass: {
        popup: 'bg-green-100', // Establecer el color de fondo verde claro
        icon: 'text-green-700', // Establecer el color del icono
        title: 'text-green-700' // Establecer el color del texto del título
      }
    });
    Toast.fire({
      icon: "success",
      title: text
    });
  }

  errorAlert(title: string, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      customClass: {
        popup: 'bg-red-100',
        icon: 'text-red-500', 
        title: 'text-red-500'
      }
    });
    Toast.fire({
      icon: "error",
      text: text,
    });

  }

  // infoAlert(title: string, text: string) {
  //   Swal.fire({
  //     icon: "info",
  //     title: title,
  //     text: text,
  //     footer: '<a href="#">Why do I have this issue?</a>'
  //   });
  // }

  // warningAlert(title: string, text: string) {
  //   Swal.fire({
  //     icon: "warning",
  //     title: title,
  //     text: text,
  //     footer: '<a href="#">Why do I have this issue?</a>'
  //   });
  // }
  
}
