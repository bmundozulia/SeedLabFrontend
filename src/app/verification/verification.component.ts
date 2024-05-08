import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent implements OnInit {

constructor(){}

  ngOnInit(){
    
}
move(e:any, p:any, c:any, n:any){
  var length= c.value.length;
  var maxlength= c.getAttribute('maxlength');
    if(length == maxlength){
      if(n !=""){
        n.focus();
      }  
    }
    if(e.key === "Backspace"){
      if(p != ""){
        p.focus();
      }
    }
  }
}
