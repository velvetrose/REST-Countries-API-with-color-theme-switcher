import { CountryDetailsComponent } from './country-details/country-details.component';
import { CountriesComponent } from './countries/countries.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:CountriesComponent},
  {path:'country-details/:name',component:CountryDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
