import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Act } from 'src/app/models/act';
import { Location } from 'src/app/models/location';
import { ActService } from 'src/app/services/act-service.service';
import { DialogService } from 'src/app/services/dialog-service.service';
import { LocationService } from 'src/app/services/location-service.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locations : Location[] = [];
  currentPage:number=1;
  totalPages:number=1;
  limit:number=2;

  constructor(private _locationService: LocationService, 
    private _router: Router, 
    private dialogService: DialogService,
    private _actService: ActService) {}

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this._locationService.getLocations(this.currentPage,this.limit).subscribe({
      next: data => {
        this.locations = data.locations;
        this.totalPages=data.totalPages;
        this.setActsNames();
      }, 
      error: error => {
      console.log(error);
      }
    })
  }

  editLocation(location: Location): void {
    this._router.navigate(['/edit-location/' + location._id]);
  }

  confirmDelete(location: Location) {
    this.dialogService.openConfirmDialog("Are you sure you wish to delete this element?", "Yes", "No")
    .afterClosed().subscribe(res => {
      if(res){
        this.deleteLocation(location);
        this.getLocations();
      }
    });
  }

  deleteLocation(location: Location): void {
    this._locationService.deleteLocation(location._id).subscribe(
      () => {
        this.getLocations();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  addLocation(){
    this._router.navigate(['/location']);
  }

  prevPage(){
    this.currentPage=this.currentPage-1;
    this.getLocations();
  }
  nextPage(){
    this.currentPage=this.currentPage+1;
    this.getLocations();
  }

  getNameAct(idAct: string): Observable<string> {
    return this._actService.getAct(idAct).pipe(
      map(data => data.title)
    );
  }
  
  setActsNames() {
    this.locations.forEach((location, a) => {
      location.acts?.forEach((act, i) => {
        this.getNameAct(act).subscribe(name => {
          this.locations[a].acts![i] = name;
        });
      });
    });
  }
}
