import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { JobModel } from 'src/app/model/jobVacancyModel';
import { HttpClient } from '@angular/common/http';
import { JobVacanciesServiceService } from 'src/app/service/job-vacancies-service.service';


@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.css']
})
export class AddVacancyComponent implements OnInit {
 //displaying the dialog variable
 displayResponsive: boolean = false;

 //form name
 Job_form: FormGroup;

 //spinner variable
 isLoading: boolean;

 //array for storing the data
 JobVacancyArray: JobModel[] = [];

 //this variable is used for updating or editing the particular data
 currentId:number;

 //this variable is used to trigger adding and editing function
 isEdit:boolean=false;

 constructor(
   private router: Router,
   private productService: JobVacanciesServiceService,
   private http: HttpClient,
 ) {}

 ngOnInit() {
   //making the spinner variable true
   this.isLoading=true

   //Fetching the data from database before the DOM is loaded
   this.fetchJob();

   //this variable is made true for primeNG
   

   //Form validator of Job_form
   this.Job_form = new FormGroup({
     jobTitle: new FormControl(null, {
       updateOn: 'blur',
       validators: [Validators.required],
     }),
     positionLevelAndEmploymentType: new FormControl(null, {
       updateOn: 'blur',
       validators: [Validators.required, Validators.maxLength(180)],
     }),
     reportTo: new FormControl(null, {
       updateOn: 'blur',
       validators: [Validators.required, Validators.min(1)],
     }),
     location: new FormControl(null, {
       updateOn: 'blur',
       validators: [Validators.required],
     }),
     qualification: new FormControl(null, {
       updateOn: 'blur',
       validators: [Validators.required],
     }),
     jobProfile: new FormControl(null, {
       updateOn: 'blur',
       validators: [Validators.required],
     }),
     salaryAndBenefits: new FormControl(null, {
       updateOn: 'blur',
       validators: [Validators.required],
     }),
     contacts: new FormControl(null, {
       updateOn: 'blur',
       validators: [Validators.required],
     }),
   });
 }

 //displaying the dialog function
     showResponsiveDialog() {
     this.displayResponsive = true;
     }

 //sending the form value in database
     onCreateJob() {
     this.isLoading=true
     if(this.isEdit == false){
     this.productService.addJob(this.Job_form.value);
     setTimeout(() => {

     }, 2000);
     }else{
     this.productService.updateJob(this.Job_form.value,this.currentId);
     setTimeout(() => {
     
     this.isEdit=false
     }, 2000);
     }
     this.displayResponsive = false;
     console.log(this.Job_form.value);
     setTimeout(() => {
     this.onFetchJob()
     }, 1500);
     this.Job_form.reset();
     }

 //fetching the data from the database. this function is private
 private baseUrl="http://localhost:8080/api/v1/jobVacancy"
     private fetchJob() {
     this.isLoading=true
     this.http
     .get<{ [key: number]: JobModel }>(
       this.baseUrl
     )
     .pipe(
     map((res) => {
     const job = [];
     for (const key in res) {
     if (res.hasOwnProperty(key)) {
     job.push({ ...res[key], job_id: key });
     }
     }
     return job;
     })
     )
     .subscribe((res) => {
     console.log(res);
     this.JobVacancyArray = res;
     this.isLoading = false;
     });
     }

 //making the fetch function public
     onFetchJob() {
     this.isLoading=false
     this.fetchJob();
     }

 //deleting the data using id
     onDelete(job_id: number) {
      console.log(job_id)
     this.isLoading=true
     this.http
     .delete(
       this.baseUrl + '/' + job_id
     )
     .subscribe();

     setTimeout(() => {
     this.onFetchJob()
    
     }, 1500);
     }

 //code below is for editing the data based on id passed from DOM
     onEdit(currentid:number, jobId:number){
     this.currentId= currentid
     this.isEdit=true
     let currentJob = this.JobVacancyArray.find((p)=>{return p.id === jobId})
     console.log(currentJob)
     this.displayResponsive = true;
     this.Job_form.patchValue({
       jobTitle: currentJob.jobTitle,
       positionLevelAndEmploymentType: currentJob.positionLevelAndEmploymentType,
       reportTo: currentJob.reportTo,
     location: currentJob.location,
     qualification: currentJob.qualification,
     jobProfile: currentJob.jobProfile,
     salaryAndBenefits: currentJob.salaryAndBenefits,
     contacts: currentJob.contacts,
     })
     }
 //Below code is for managing the toast
   


}
