import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {

  filterValueList: any[] = [
    { id: 1, value: 'Movies Name' },
    { id: 2, value: 'Species' },
    { id: 3, value: 'Vehicle' },
    { id: 4, value: 'Star Ships' },
    { id: 5, value: 'Birth Year' }
  ];

  characterList: any[] = [];
  isOpen = false;
  isOpen1 = false;
  isOpen2 = false;
  isOpen3 = false;

  currentPage: number = 1;
  totalPages: number = 0;
  CharacterListFilterData: any[] = [];
  pageSize: number = 10;
  currentBatch: number = 1;
  characterDetails: any[] = [];
  speciesDetails: any = [];
  movieDetailsList:any=[];
  speciesName: string = '-';
  filterMovieCharaterList: any;
  filterMovieCharaterListResult:any[]=[];
  nextPageData:string='';
  previousPageData:string='';
  nextPageUrl: string | null = 'https://swapi.dev/api/people/';
  allCharacterList: any[]=[];
  fiterCharacterListByMovie: any;
  filteredCharacterList: any[]=[];
  filterSpeciesList: any;
  filterSpeciesCharaterList: any;
  filteredSpeciesCharacterList: any[]=[];
  movieCharacter: boolean=false;
  speciesCharacter: boolean=false;
  birthCharacter: boolean=false;
  checkedFilters: { [key: string]: boolean } = {}; 
  startYear: any;
  endYear: any;



  constructor(private apiService: ApiServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getCharacterList('');
    this.getAllCharacterData();
  

  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  toggleDropdown1() {
    this.isOpen1 = !this.isOpen1;
  }
  toggleDropdown2(){
    this.isOpen2 = !this.isOpen2;
  }
  toggleDropdown3(){
    this.isOpen3 = !this.isOpen3;
  }
  getCharacterList(url:any) {
      this.apiService.getCharacterListDetails(url).subscribe(
        response => {
          this.characterList = response?.results;
          this.totalPages = Math.ceil(response.count / this.pageSize);
          this.nextPageData= response?.next;
          this.previousPageData=response?.previous;
          this.characterList.forEach(character => {
            if (character.species.length > 0) {
              this.getSpeciesName(character.species[0], character);
            }
          });
        },
        error => {
          console.error('Error fetching data', error);
        }
      );
    
  }

  //for filter the moveis and species from all the characterlist In
  getAllCharacterData() {
    if (this.nextPageUrl) {
      this.apiService.getCharacterListDetails(this.nextPageUrl).subscribe(
        response => {
          this.allCharacterList = [...this.allCharacterList, ...response.results];
          this.totalPages = Math.ceil(response?.count / this.pageSize);
          this.nextPageUrl = response?.next;
          if (this.nextPageUrl) {
            this.getAllCharacterData();
          } else {
            console.log('All character data has been fetched');
          }
        
        },
        error => {
          console.error('Error fetching data', error);
        }
      );
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getCharacterList(this.nextPageData);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCharacterList(this.previousPageData);
    }
  }
  getCharacterDetails(url: string): void {
    this.router.navigateByUrl(`home/character/${url.split('/').slice(-2, -1)[0]}`);
  }

  // getSpeciesName(url: any) {
  //   console.log(url);
  //   this.apiService.getCharacterSpecies(url).subscribe(
  //     response => {
  //       this.speciesDetails = response;
  //       console.log( this.speciesDetails);
        
  //       this.speciesName = this.speciesDetails?.name;
  //     },
  //     error => {
  //       console.error('Error fetching data', error);
  //     }
  //   );
  // }
  getSpeciesName(url: string, character: any) {
    this.apiService.getCharacterSpecies(url).subscribe(
      response => {
        character.speciesName = response?.name; // Assign the species name to the character
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  toggleMovieSelection(episodeId:any,event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement);   
    const isChecked = inputElement.checked;
    if (isChecked) {;
      this.movieCharacter=true
      //  this.getMoviesList(episodeId)
    }
    else{
      this.movieCharacter=false;
    }
  }
  filterCharacters(): void {
    this.filteredCharacterList = this.allCharacterList.filter(character =>
      this.filterMovieCharaterListResult.find((characterMovie:any) => character.url === characterMovie)
    );
      console.log('Filtered character list:', this.filteredCharacterList);
    this.characterList=this.filteredCharacterList;
  }

  getMoviesList(episodeId:any){
    this.apiService.getMovies().subscribe(  
      response => {
        this.movieDetailsList = response?.results;
        this.filterMovieCharaterList= this.movieDetailsList?.find((movie:any) => movie.episode_id == episodeId);
         this.filterMovieCharaterListResult=this.filterMovieCharaterList.characters;
         console.log(this.filterMovieCharaterListResult);
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }
 
  toggleSpecieselection(species:any,event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement);   
    const isChecked = inputElement.checked;
    if (isChecked) {
       this.speciesCharacter=true;
      //  this.getSpeciesList(species)
       
    }
    else{
      this.speciesCharacter=false;
    }
  }
  getSpeciesList(species:any){
    this.apiService.getSpecies().subscribe(  
      response => {
        this.speciesDetails = response?.results;
        console.log(  this.speciesDetails);
        this.filterSpeciesList= this.speciesDetails?.find((spec:any) => spec.name == species);
         this.filterSpeciesCharaterList=this.filterSpeciesList?.people;
         console.log(this.filterSpeciesCharaterList);
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }
  filterSpecies(): void {
    this.filteredSpeciesCharacterList = this.allCharacterList?.filter(character =>
      this.filterSpeciesCharaterList?.find((species:any) =>character.url  ===species )
    );
      console.log('Filtered character list:', this.filteredSpeciesCharacterList);
    this.characterList=this.filteredSpeciesCharacterList;
  }

  filterCharactersByBirthYear(startYear: string, endYear: string): void {

    const parseYear = (year: string): number => {
      const isBBY = year.includes('BBY');
      const numericValue = parseFloat(year.replace('BBY', '').replace('ABY', ''));
      return isBBY ? -numericValue : numericValue;
    };
    const start = parseYear(startYear);
    const end = parseYear(endYear);
    this.filteredCharacterList = this.allCharacterList?.filter(character => {
      const birthYear = character.birth_year;
      if (birthYear === 'unknown') return false;
      const parsedYear = parseYear(birthYear);
      return parsedYear >= start && parsedYear <= end;
    });
    this.characterList=this.filteredCharacterList;

    console.log('Filtered character list by birth year:', this.filteredCharacterList);
  }

  toggleBirthSelection(birth:any,event: Event): void {
    console.log(birth);
    
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement);   
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.birthCharacter=true;
      const [startYear, endYear] =birth.split(' and ');
      this.startYear = startYear;
      this.endYear = endYear;
      // this.filterCharactersByBirthYear( this.startYear, this.endYear);
    }
    else{
      this.birthCharacter=false;
    }
  }
  searchItem() {
     if (this.movieCharacter) {
      this.filterCharacters();

    } else if(this.speciesCharacter){
      this.filterSpecies()

    }else if (this.birthCharacter) {
      this.filterCharactersByBirthYear( this.startYear, this.endYear);
    }else{
      this.getCharacterList(this.nextPageUrl);
    }
  }


}

