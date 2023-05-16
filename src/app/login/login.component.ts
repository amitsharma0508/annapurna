import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form!:NgForm;
  constructor(private router:Router, private dataService: ImageService) { }
  randomNumber:number
  ngOnInit(): void {
  }
  login(){
    console.log(this.form.value["user"])
    if(this.form.value["user"] == "user123" && this.form.value["password"] == "annapurna123"){
      this.dataService.sendData(this.form.value["password"]);
      this.randomNumber = Math.random()
      console.log(this.randomNumber + "random")
    
      let navigationExtras: NavigationExtras = {
        queryParams: {
          param: "FMfcgzGsmXCRWQRtxVwCvtvppFKnmbrN",
          type: this.randomNumber
        }
      };
      this.dataService.sendAuth(this.randomNumber)
      this.router.navigate(['/admin'], navigationExtras);
    }
  }

}
