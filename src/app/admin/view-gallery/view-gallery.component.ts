import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-gallery',
  templateUrl: './view-gallery.component.html',
  styleUrls: ['./view-gallery.component.css']
})
export class ViewGalleryComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit() {
    // this.resetForm();
    this.fetchImages()
  }


  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.http.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );

    this.fetchImages();
  }
  tokenData: any = JSON.parse(sessionStorage.getItem('authInfo'));

  // Http Options
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: this.tokenData.tokenType + this.tokenData.accessToken
  })
}

  imageUrls: string[] = [];
  fetchImages() {
    this.http.get('http://localhost:8080/image/getall'+this.httpOptions).subscribe(images => {

      this.retrieveResonse = images;
        for(let i=0; i<this.retrieveResonse.length; i++){
          this.base64Data = this.retrieveResonse[i].picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          this.imageUrls.push(this.retrievedImage);
        }

    });
    console.log(this.retrieveResonse)
  }

}
