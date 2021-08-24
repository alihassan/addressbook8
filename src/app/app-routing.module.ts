import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddressComponent } from './add-address/add-address.component';
import { DisplayAddressComponent } from './display-address/display-address.component';

const routes: Routes = [
  {
  path: '',
  redirectTo: 'display', 
  pathMatch: 'full'
},
{
  component:AddAddressComponent,
  path:'add'
},
{
  component:AddAddressComponent,
  path:'update/:id'
},
{
  component:DisplayAddressComponent,
  path:'display'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
