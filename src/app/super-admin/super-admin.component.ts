import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../servicios/switch.service';


@Component({
  selector: 'app-super-admin',

  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent implements OnInit {

  modalSwitch: boolean;

  constructor(private modalSS: SwitchService) {

  }

  ngOnInit() {

    this.modalSS.$modal.subscribe((valor) => { this.modalSwitch = valor })

  }
  openModal() {
    this.modalSwitch = true;
  }
}
