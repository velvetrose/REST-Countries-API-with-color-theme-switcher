import { ICountry } from './../models/iCountry';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent {
  countryFullName: string = '';
  countries!: ICountry[];
  languages!: [];
  currencies!: [];
  currencyList!: any;
  currency: string = '';
  borderCodes!: string[];
  borders!: ICountry[];
  borderVisibility: boolean = false;
  isLoading: boolean = false;


  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.countryFullName = params.get('name') as string;
      this.getCountry(this.countryFullName);
    });
    
  }
  getCountry(coun:string){
    this.isLoading = true;
    this.api.getCountryByFullName(coun).subscribe((country) => {
      this.countries = country;
      this.isLoading = false;
      // console.log(this.countries[0]);
      if (this.countries[0] != null || this.countries[0] !== undefined) {
        this.languages = this.countries[0].languages as any;
        this.currencies = this.countries[0].currencies as any;
        this.languages = Object.values(this.languages) as any;
        this.currencyList = Object.values(this.currencies) as any;
        this.currency = this.currencyList[0].name;
        this.borderCodes = this.countries[0].borders as any;
        // console.log(this.borderCodes);
        this.api.getCountryByCode(this.borderCodes).subscribe((border) => {
          // console.log(border);
          if (this.borders !== null || this.borders !== undefined) {
            this.borderVisibility = true;
            this.borders = border as any;
            // console.log(this.borders);
          }
        });
      }
    });
  }
}
