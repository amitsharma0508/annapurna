import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { finalize } from "rxjs/operators";
import { ImageService } from "src/app/shared/image.service";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {
  imgSrc: string;
  imgSrc2: string;
  imgSrc3: string;
  selectedImage: any = null;
  selectedImage1:any = null;
  selectedImage2:any = null;
  isSubmitted: boolean;

  CigarettesForm = new FormGroup({
    id: new FormControl("", Validators.required),
    productName: new FormControl("", Validators.required),
    productPrice: new FormControl(""),
    productDescription: new FormControl("", Validators.required),
    productType: new FormControl("", Validators.required),
    imageUrl: new FormControl("", Validators.required),
    imageUrl1: new FormControl(""),
    imageUrl2: new FormControl("")
  });
  toggleAddForm: boolean = false;
  toggleViewProduct: boolean = false;

  imageList: any[];
  rowIndexArray: any[];
  private database: firebase.database.Database;
  constructor(
    private storage: AngularFireStorage,
    private service: ImageService
  ) {
    this.database = firebase.database();
  }

  ngOnInit(): void {
    //fetching the data
    this.service.accessoriesDetails.snapshotChanges().subscribe((list) => {
      this.imageList = list.map((item) => {
        return item.payload.val();
      });
      this.rowIndexArray = Array.from(
        Array(Math.ceil((this.imageList.length + 1) / 3)).keys()
      );
    });

    //resetting the form
    this.resetForm();
  }

  //making the adding form visible
  openAddForm() {
    this.toggleViewProduct = false;
    this.toggleAddForm = true;
  }

  //making the viewProduct visible
  viewProduct() {
    this.toggleAddForm = false;
    this.toggleViewProduct = true;
  }

  //preview image
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1wpLe7tCBNs9lRZIH-8qMa8HI69GZu76QQ&usqp=CAU";
      this.selectedImage = null;
    }
  }
  showPreview1(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage1 = event.target.files[0];
    } else {
      this.imgSrc3 =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1wpLe7tCBNs9lRZIH-8qMa8HI69GZu76QQ&usqp=CAU";
      this.selectedImage1 = null;
    }
  }
  showPreview2(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage2 = event.target.files[0];
    } else {
      this.imgSrc =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1wpLe7tCBNs9lRZIH-8qMa8HI69GZu76QQ&usqp=CAU";
      this.selectedImage2 = null;
    }
  }
  //onSubmit
  // onSubmit(formValue) {
  //   this.isSubmitted = true;
  //   if (this.CigarettesForm.valid) {
  //     var filePath = `${formValue.productType}/${this.selectedImage.name
  //       .split(".")
  //       .slice(0, -1)
  //       .join(".")}_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage
  //       .upload(filePath, this.selectedImage)
  //       .snapshotChanges()
  //       .pipe(
  //         finalize(() => {
  //           fileRef.getDownloadURL().subscribe((url) => {
  //             formValue["imageUrl"] = url;
  //             console.log(this.CigarettesForm.value);
  //             console.log(formValue);
  //             this.service.insertCigarettesDetails(this.CigarettesForm.value);
  //             console.log(formValue);
  //             this.resetForm();
  //           });
  //         })
  //       )
  //       .subscribe();
  //   }
  // }
  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.CigarettesForm.valid) {
      var filePath1 = `${formValue.productType}/${this.selectedImage.name
        .split(".")
        .slice(0, -1)
        .join(".")}_${new Date().getTime()}`;
      var filePath2 = `${formValue.productType}/${this.selectedImage1.name
        .split(".")
        .slice(0, -1)
        .join(".")}_${new Date().getTime()}`;
      var filePath3 = `${formValue.productType}/${this.selectedImage2.name
        .split(".")
        .slice(0, -1)
        .join(".")}_${new Date().getTime()}`;
  
      const fileRef1 = this.storage.ref(filePath1);
      const fileRef2 = this.storage.ref(filePath2);
      const fileRef3 = this.storage.ref(filePath3);
  
      // Upload the first image
      this.storage
        .upload(filePath1, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef1.getDownloadURL().subscribe((url1) => {
              formValue["imageUrl"] = url1;
  
              // Upload the second image
              this.storage
                .upload(filePath2, this.selectedImage1)
                .snapshotChanges()
                .pipe(
                  finalize(() => {
                    fileRef2.getDownloadURL().subscribe((url2) => {
                      formValue["imageUrl1"] = url2;
  
                      // Upload the third image
                      this.storage
                        .upload(filePath3, this.selectedImage2)
                        .snapshotChanges()
                        .pipe(
                          finalize(() => {
                            fileRef3.getDownloadURL().subscribe((url3) => {
                              formValue["imageUrl2"] = url3;
  
                              // Insert grocery details
                              console.log(formValue);
                              this.service.insertAccessoriesDetails(this.CigarettesForm.value);
                              console.log(formValue);
                              this.resetForm();
                            });
                          })
                        )
                        .subscribe();
                    });
                  })
                )
                .subscribe();
            });
          })
        )
        .subscribe();
    }
  }
  //
  get formControls() {
    return this.CigarettesForm["controls"];
  }

  //resetting the form after submit
  resetForm() {
    this.CigarettesForm.reset();
    this.CigarettesForm.setValue({
      id: Math.random().toString(36).substring(2, 7),
      productName: "",
      productPrice: "",
      productDescription: "",
      productType: "",
      imageUrl: "",
      imageUrl1:"",
      imageUrl2:""
    });
    this.imgSrc =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1wpLe7tCBNs9lRZIH-8qMa8HI69GZu76QQ&usqp=CAU";
      this.imgSrc2 =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1wpLe7tCBNs9lRZIH-8qMa8HI69GZu76QQ&usqp=CAU";
      this.imgSrc3 =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1wpLe7tCBNs9lRZIH-8qMa8HI69GZu76QQ&usqp=CAU";
      this.selectedImage = null;
    this.isSubmitted = false;
  }

  //deleting
  deleteCigrattesItem(item, itemID) {
    console.log("Deleting item with key:", itemID);

    const cigarettesListRef = firebase.database().ref("accessoriesList");
    let itemKey;

    // Find the key of the item with the given product name
    cigarettesListRef
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

      const storageRef1 = firebase.storage().refFromURL(item.imageUrl1);
      storageRef1
      .delete()
      .then(() => {
        console.log("Image deleted successfully");
      })
      .catch((error) => {
        console.log("Error deleting image:", error);
      });

      const storageRef2 = firebase.storage().refFromURL(item.imageUrl2);
      storageRef2
      .delete()
      .then(() => {
        console.log("Image deleted successfully");
      })
      .catch((error) => {
        console.log("Error deleting image:", error);
      });

    // Remove the corresponding data from the real-time database
    // Remove the corresponding data from the real-time database
    cigarettesListRef
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
