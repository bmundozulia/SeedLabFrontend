import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../../servicios/switch.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  constructor(private modalSS: SwitchService) {

  }

  ngOnInit(): void {

  }

  closeModal() {
    this.modalSS.$modal.emit(false)
  }

  confirmarModal() {
    this.modalSS.$modal.emit(false);
  }
}