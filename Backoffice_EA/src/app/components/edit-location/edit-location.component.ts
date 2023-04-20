import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location-service.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {
  form: FormGroup;
  locationId?: string;
  locationData: Location = { name: '', city: '', population: 0, latitude: 0, longitude: 0 };
  showMessage = false;
  
  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private _locationService: LocationService, private _router: Router) {

    this.form = this._fb.group({
      "id": ['', Validators.required],
      "name": [''],
      "city": [''],
      "population": [0],
      "latitude": [0],
      "longitude": [0],
    })
  }

  ngOnInit(): void {
    this.locationId = this.route.snapshot.params['id'];
    this.getLocationData();
  }

  getLocationData(): void {
    this._locationService.getLocation(this.locationId).subscribe(
      (data: Location) => {
        this.locationData = data;
        this.setLocationData();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    const name = this.form.controls['name'].value;
    const city = this.form.controls['city'].value;
    const population = this.form.controls['population'].value;
    const latitude = this.form.controls['latitude'].value;
    const longitude = this.form.controls['longitude'].value;
    this.locationData = {name, city, population, latitude, longitude};

    this._locationService.editLocation(this.locationId, this.locationData).subscribe(
      (data: Location) => {
        this.locationData = data;
        this.setLocationData();
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this._router.navigate(['/locations']);
    }, 1000);
  }

  setLocationData(): void {
    this.form = this._fb.group({
      name: new FormControl(this.locationData.name, Validators.required),
      city: new FormControl(this.locationData.city, Validators.required),
      population: new FormControl(this.locationData.population, Validators.required),
      longitude: new FormControl(this.locationData.longitude, Validators.required),
      latitude: new FormControl(this.locationData.latitude, Validators.required),
    });
  }
}
