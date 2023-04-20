import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location-service.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent {
  
  form: FormGroup;

  constructor(private _fb: FormBuilder, private _locationService: LocationService, private _router: Router){
    this.form = this._fb.group({
      "name": ['', Validators.required],
      "city": ['', Validators.required],
      "population": ['', Validators.required],
      "latitude": ['', Validators.required],
      "longitude": ['', Validators.required],
    })
  }

  addLocation():void{
    this._locationService.addLocation(this.form.value).subscribe(data =>{
      this._router.navigate(['/locations']);
    }, error => {
      console.log(error);
    })
  }
}
