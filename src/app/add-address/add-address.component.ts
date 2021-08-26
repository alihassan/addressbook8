import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  id: number = 0;
  isAddMode: boolean = true;

  addAddress = new FormGroup({
    id: new FormControl(),
    name: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl('Male'),
    address: new FormControl(''),
    city: new FormControl('Your City'),
  })
  alert: boolean = false;
  closeAlert() {
    this.alert = false;
  }
  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    //Condition if add mode then not to fetcch data from database
    if(!this.isAddMode){
    this.personService.getByID(this.id).subscribe((result) => {
      this.addAddress.setValue(result)
    })
  }
  }

  onSubmit() {
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  createUser() {
    return this.personService.savetodb(this.addAddress.value).subscribe(() => {
      //console.log("Data Entered Successfull to DB")
      alert('Address Added to Database Successfully');
      this.router.navigate(['display'])
    })

  }
  updateUser() {
    //console.log("item", this.addAddress.value)
    return this.personService.updateAddress(this.id, this.addAddress.value).subscribe(() => {
      //console.log("Updated")
      alert('Address updated in Database Successfully');
      this.router.navigate(['display'])
    })
  }

}
