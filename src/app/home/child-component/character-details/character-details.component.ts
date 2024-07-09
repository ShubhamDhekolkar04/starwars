import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})

export class CharacterDetailsComponent {

  characterDetails: any=[];
  speciesDetails:any=[];
  parentDetails:any=[];

  speciesName: string='-';
  parentName: string='-';
  movieDetailsList: any[] = [];
  allFilmsUrl: any;
  vehicleDetailsList: any[]=[];
  starShipsDetailsList: any[]=[];

  constructor(private route: ActivatedRoute, private apiService: ApiServiceService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getCharacterDetails(`https://swapi.dev/api/people/${id}/`).subscribe(
      response => {
        this.characterDetails = response;
        this.getSpeciesName(this.characterDetails?.species[0])
        this.getParentName(this.characterDetails?.homeworld)
        // this.allFilmsUrl=this.characterDetails.films
        console.log(this.characterDetails.films);
        
        this.getMovieDetails(this.characterDetails.films)
        this.getVehicleDetails(this.characterDetails.vehicles)
        this.getStarshipsDetails(this.characterDetails.starships)
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }
  getSpeciesName(url:any){
    this.apiService.getCharacterSpecies(url).subscribe(
      response => {
        this.speciesDetails = response;
        console.log('spe',this.speciesDetails.name);
        this.speciesName=this.speciesDetails?.name;
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }
  getParentName(url:any){
    this.apiService.getCharacterParentName(url).subscribe(
      response => {
        this.parentDetails = response;
        this.parentName=this.parentDetails?.name;            
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  getMovieDetails(filmUrls: string[]): void {
    const movieDetailsObservables = filmUrls.map(url => 
      this.apiService.getMoviesDetails(url));

    forkJoin(movieDetailsObservables).subscribe(
      responses => {
        this.movieDetailsList = responses;
        console.log(this.movieDetailsList);
      },
      error => {
        console.error('Error fetching movie details', error);
      }
    );
  }
  getVehicleDetails(filmUrls: string[]): void {
    const vehiclDetailsObservables = filmUrls.map(url => 
      this.apiService.getVehicleDetails(url));

    forkJoin(vehiclDetailsObservables).subscribe(
      responses => {
        this.vehicleDetailsList = responses;
        console.log(this.vehicleDetailsList);
      },
      error => {
        console.error('Error fetching movie details', error);
      }
    );
  }
  getStarshipsDetails(filmUrls: string[]): void {
    const starshipsDetailsObservables = filmUrls.map(url => 
      this.apiService.getVehicleDetails(url));

    forkJoin(starshipsDetailsObservables).subscribe(
      responses => {
        this.starShipsDetailsList = responses;
        console.log(this.vehicleDetailsList);
      },
      error => {
        console.error('Error fetching movie details', error);
      }
    );
  }
}
