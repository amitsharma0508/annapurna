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
  selectedImage: any = null;
  isSubmitted: boolean;

  dryGroceryForm = new FormGroup({
    id: new FormControl("", Validators.required),
    productName: new FormControl("", Validators.required),
    productPrice: new FormControl(""),
    productDescription: new FormControl("", Validators.required),
    productType: new FormControl("", Validators.required),
    imageUrl: new FormControl("", Validators.required),
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
      this.imgSrc =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1wpLe7tCBNs9lRZIH-8qMa8HI69GZu76QQ&usqp=CAU";
      this.selectedImage = null;
    }
  }

  //onSubmit
  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.dryGroceryForm.valid) {
      var filePath = `${formValue.productType}/${this.selectedImage.name
        .split(".")
        .slice(0, -1)
        .join(".")}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue["imageUrl"] = url;
              console.log(this.dryGroceryForm.value);
              console.log(formValue);
              this.service.insertGroceryDetails(this.dryGroceryForm.value);
              console.log(formValue);
              this.resetForm();
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
    });
    this.imgSrc =
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
