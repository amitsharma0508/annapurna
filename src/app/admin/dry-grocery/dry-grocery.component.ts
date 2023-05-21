import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { finalize } from "rxjs/operators";
import { ImageService } from "src/app/shared/image.service";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

@Component({
  selector: "app-dry-grocery",
  templateUrl: "./dry-grocery.component.html",
  styleUrls: ["./dry-grocery.component.css"],
})
export class DryGroceryComponent implements OnInit {
  imgSrc: string;
  imgSrc2: string;
  imgSrc3: string;
  selectedImage: any = null;
  selectedImage1:any = null;
  selectedImage2:any = null;
  isSubmitted: boolean;

  dryGroceryForm = new FormGroup({
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
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private service: ImageService
  ) // private firebase: AngularFireDatabase,

  {
    const firebaseConfig = {
      // your Firebase project configuration object
    };
    // firebase.initializeApp(firebaseConfig);
    this.database = firebase.database();
  }

  ngOnInit(): void {
    //fetching the data
    this.service.groceryDetails.snapshotChanges().subscribe((list) => {
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
      this.imgSrc2 =
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
  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.dryGroceryForm.valid) {
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
                              this.service.insertGroceryDetails(this.dryGroceryForm.value);
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

  //validating Form
  get formControls() {
    return this.dryGroceryForm["controls"];
  }

  //resetting the form after submit
  resetForm() {
    this.dryGroceryForm.reset();
    this.dryGroceryForm.setValue({
      id: Math.random().toString(36).substring(2, 7),
      productName: "",
      productPrice: "",
      productDescription: "",
      productType: "",
      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",
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
  deleteGroceryItem(item, itemID) {
    console.log("Deleting item with key:", itemID);

    const groceryListRef = firebase.database().ref("groceryList");
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
