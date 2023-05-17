import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { finalize } from 'rxjs/operators';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-produce',
  templateUrl: './produce.component.html',
  styleUrls: ['./produce.component.css']
})
export class ProduceComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  produceForm = new FormGroup({
    id: new FormControl("", Validators.required),
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
    this.service.produceDetails.snapshotChanges().subscribe(
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
    if (this.produceForm.valid) {
      var filePath = `${formValue.productType}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            console.log(this.produceForm.value)
            console.log(formValue)
            this.service.insertProduceDetails(this.produceForm.value);
            console.log(formValue)
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  //
  get formControls() {
    return this.produceForm['controls'];
  }

  //resetting the form after submit
  resetForm() {
    this.produceForm.reset();
    this.produceForm.setValue({
      id: Math.random().toString(36).substring(2, 7),
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

    //deleting
    deleteGroceryItem(item, itemID) {
      console.log("Deleting item with key:", itemID);
  
      const groceryListRef = firebase.database().ref("produceList");
      let itemKey;
  
      // Find the key of the item with the given product name
      groceryListRef
        .orderByChild("id")
        .equalTo(itemID)
        .once("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            itemKey = childSnapshot.key;
          });
        });
  
      // Remove the image from storage
      const storageRef = firebase.storage().refFromURL(item.imageUrl);
      storageRef
        .delete()
        .then(() => {
          console.log("Image deleted successfully");
        })
        .catch((error) => {
          console.log("Error deleting image:", error);
        });
  
      // Remove the corresponding data from the real-time database
      // Remove the corresponding data from the real-time database
      groceryListRef
        .child(itemKey)
        .remove()
        .then(() => {
          console.log("Data deleted successfully");
        })
        .catch((error) => {
          console.log("Error deleting data:", error);
        });
    }
}
