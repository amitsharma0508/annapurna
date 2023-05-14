import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { JobApplied } from 'src/app/model/jobAppliedModel';
import { JobAppliedServiceService } from 'src/app/service/job-applied-service.service';

@Component({
  selector: 'app-application-of-vacency',
  templateUrl: './application-of-vacency.component.html',
  styleUrls: ['./application-of-vacency.component.css']
})
export class ApplicationOfVacencyComponent implements OnInit {
 //array for storing the data
 jobApplicationArray:JobApplied[]=[]

 //spinner variable
 isLoading: boolean;

 //base url to connect to database
 private baseUrl="http://localhost:8080/api/v2/jobApplicant"


 constructor(private JobAppliedService:JobAppliedServiceService,
   private http: HttpClient,
  ) { }


   ngOnInit() {
     //making the spinner variable true
     this.isLoading=true

     //Fetching the data from database before the DOM is loaded
     this.fetchJob();

   }

 //fetching the data from the database. this function is private
 private fetchJob() {
   this.isLoading=true
   this.http
   .get<{ [key: string]: JobApplied }>(
     this.baseUrl
   )
   .pipe(
   map((res) => {
   const job = [];
   for (const key in res) {
   if (res.hasOwnProperty(key)) {
   job.push({ ...res[key], id: key });
   }
   }
   return job;
   })
   )
   .subscribe((res) => {
   console.log(res);
   this.jobApplicationArray = res;
   this.isLoading = false;
   });
   }

//making the fetch function public
   onFetchJob() {
   this.isLoading=false
   this.fetchJob();
   }

   //deleting the data using id
   onDelete(id: string) {
     this.isLoading=true
     this.http
     .delete(
       this.baseUrl + '/' + id
     )
     .subscribe();

     setTimeout(() => {
     this.onFetchJob()
    
     }, 1500);
     }

  //Below code is for managing the toast
 

}
