import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  public locationForm: FormGroup;
  public txtName: FormControl = new FormControl('', Validators.required);
  public txtAddress: FormControl = new FormControl('', Validators.required);
  private user: User;
  private selectedAddress: Address;
  @ViewChild('placesRef', {static: false}) placesRef: GooglePlaceDirective;

  constructor(private locationService: LocationService, private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.locationForm = new FormGroup({
      txtName: this.txtName,
      txtAddress: this.txtAddress,
      filePicture: new FormControl()
    });

    this.user = this.sessionService.getUserFromSession();
  }

  public onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.locationForm.get('filePicture').setValue(file);
    }
  }

  public onSubmit(): void {
    if (this.selectedAddress) {
      const formData = this.createFormData();

      this.locationService.post(formData).subscribe(
        (location) => {
          this.router.navigate(['/locations']);
        },
        (error) => {
          console.log("Error while saving location: ", error);
        }
      );
    } else {            
      this.txtAddress.setErrors({ required: true });
    }
  }


  private createFormData() {
    const formData = new FormData();

    formData.append('Name', this.locationForm.get('txtName').value);
    formData.append('Address', this.selectedAddress.formatted_address);
    formData.append('Lat', this.selectedAddress.geometry.location.lat().toString());
    formData.append('Lng', this.selectedAddress.geometry.location.lng().toString());
    formData.append('Picture', this.locationForm.get('filePicture').value);
    formData.append('userId', this.user.id);

    return formData;
  }

  public txtAddress_OnChange(address: Address) {
    this.selectedAddress = address;
    this.txtName.setValue(address.name);
    this.txtAddress.setValue(address.formatted_address);
  }
}