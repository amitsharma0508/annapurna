import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NavController, ToastController } from '@ionic/angular';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  feedbackForm: any = FormGroup;
  message!: string;
  css!: string;

  constructor(
    private navCtrl: NavController,
    private callNumber: CallNumber,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  call() {
    this.callNumber.callNumber("1818", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  back() {
    this.navCtrl.navigateForward('/dashboard');
  }

  onSubmit() {
    if (this.feedbackForm.invalid) {
      return;
    } else {
      const subject = this.feedbackForm.get('subject')!.value;
      const message = this.feedbackForm.get('message')!.value;

      this.dataService.postFeedBack(subject, message).subscribe(res => {
        console.log(res);
        this.message = 'Feedback sent successfully';
        this.css = 'success';
        this.showToast();
      }, (error) => {
        this.message = 'Feedback sent failed, please try again later';
        this.css = 'danger';
        this.showToast();
      });
    }
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: this.message,
      duration: 3000,
      position: 'bottom',
      color: this.css
    });
    toast.onDidDismiss();
    toast.present();
  }

  // convenience getter for easy access to form fields
  get f() { return this.feedbackForm.controls; }

}
