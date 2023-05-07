import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-tobacco',
  templateUrl: './tobacco.component.html',
  styleUrls: ['./tobacco.component.css']
})
export class TobaccoComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  tobaccoForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    productPrice: new FormControl(''),
    productDescription: new FormControl('', Validators.required),
    productType: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  })
  toggleAddForm:boolean=false;
  toggleViewProduct:boolean=false;

  imageList: any[];
  rowIndexArray: any[];

  constructor(private storage: AngularFireStorage, private service: ImageService) { }

  ngOnInit(): void {
    //fetching the data
    this.service.tobaccoDetails.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => { return item.payload.val(); });
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    );
    
  //resetting the form
      this.resetForm();
  }

  //making the adding form visible
  openAddForm(){
    this.toggleViewProduct=false;
    this.toggleAddForm = true;
  }

  //making the viewProduct visible
  viewProduct(){
    this.toggleAddForm = false;
    this.toggleViewProduct=true;
  }

  //preview image
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1wpLe7tCBNs9lRZIH-8qMa8HI69GZu76QQ&usqp=CAU';
      this.selectedImage = null;
    }
  }

  //onSubmit
  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.tobaccoForm.valid) {
      var filePath = `${formValue.productType}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            console.log(this.tobaccoForm.value)
            console.log(formValue)
            this.service.insertTobaccoDetails(this.tobaccoForm.value);
            console.log(formValue)
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  //
  get formControls() {
    return this.tobaccoForm['controls'];
  }

  //resetting the form after submit
  resetForm() {
    this.tobaccoForm.reset();
    this.tobaccoForm.setValue({
      productName: '',
      productPrice:'',
      productDescription:'',
      productType:'',
      imageUrl: ''
    });
    this.imgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1wpLe7tCBNs9lRZIH-8qMa8HI69GZu76QQ&usqp=CAU';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

}
