import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  public locationForm: FormGroup;
  public txtName: FormControl = new FormControl('', Validators.required);
  public txtAddress: FormControl = new FormControl('', Validators.required);;

  ngOnInit() {
    this.locationForm = new FormGroup({
      txtName: this.txtName,
      txtAddress: this.txtAddress,
      filePicture: new FormControl()
    });
  }

  public onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];      
      this.locationForm.get('filePicture').setValue(file);
    }
  }

  public onSubmit(): void {
    const formData = this.createFormData();

    this.locationService.post(formData).subscribe(
      (location)=>{
        console.log("Location created: ", location);
      },
      (error) => {
        console.log("Error while saving location: ", error);
      }
    );
  }


  private createFormData() {
    const formData = new FormData();

    formData.append('Name', this.locationForm.get('txtName').value);
    formData.append('Address', this.locationForm.get('txtAddress').value);
    formData.append('Lat', "90");
    formData.append('Lng', "-90");
    formData.append('Picture', this.locationForm.get('filePicture').value);
    formData.append('userId', '123abc');
    
    return formData;
  }
}