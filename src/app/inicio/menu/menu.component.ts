import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isLeft = true;

  toggleSlide() {
    this.isLeft = !this.isLeft;
  }
}

