import { Component } from '@angular/core';
import { ICountry } from '../models/iCountry';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent {
  countries!: ICountry[];
  searchValue = '';
  dropValue = '';
  isLoading: boolean = false;

  constructor(private api: ApiService,private route:ActivatedRoute,private router:Router) {}
  ngOnInit() {
    console.log(this.dropValue);
    this.isLoading = true;
    this.api.getAllCountries().subscribe((res) => {
      //console.log(res);
      this.countries = res;
      this.isLoading = false;
    });
  }

  getCountry(e: any) {
    if (e.keyCode == 13) {
      this.searchValue = e.target.value;
      // console.log(this.searchValue);
      this.isLoading = true;
      if (this.searchValue == '') {
        this.api.getAllCountries().subscribe((res) => {
          this.countries = res;
          this.isLoading = false;
        });
      }
      else {
        this.api.getCountryByName(this.searchValue).subscribe((name) => {
          // console.log(name);
          this.isLoading = false;
          this.countries = name;
        },(error)=>{
          this.isLoading = false;
          alert(error.statusText);
          e.target.value='';
        },()=>{});
      }
    }
  }

  getCountryRegion(e: any) {
    // console.log(e.target.innerHTML);
    this.dropValue = e.target.innerHTML;
    this.isLoading = true;
    this.api.getCountryByRegion(this.dropValue).subscribe((region) => {
      this.isLoading = false;
      this.countries = region;
    });
  }

  getCountryDetails(c:ICountry){
    this.router.navigate(['country-details/'+c.name.common],{relativeTo:this.route});
    console.log(c.name.common);
  }

}
