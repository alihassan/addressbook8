import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  id = 0;
  isAddMode = true;
  status = false;

  addAddress = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    email: new FormControl('',
      [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]),
    gender: new FormControl('Male'),
    address: new FormControl('', Validators.required),
    city: new FormControl('Your City'),
  });

  closeAlert() {
    this.status = false;
  }

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    // Condition if add mode then not to fetch data from database
    if (!this.isAddMode) {
      this.personService.getByID(this.id).subscribe((result) => {
        this.addAddress.setValue(result);
      });
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

    return this.personService.savetodb(this.addAddress.value).subscribe(
      () => {
        // console.log('Data Entered Successfull to DB');
        alert('Address Added to Database Successfully');
        this.router.navigate(['display']);
      },
      (error) => {
        this.status = true; // Status of error(on html template) is set to true if data is not added to database
        console.log('myError = ' + error.message);
      }
    );
  }
  updateUser() {
    // console.log("item", this.addAddress.value)
    return this.personService.updateAddress(this.id, this.addAddress.value).subscribe(
      () => {
        // console.log("Updated")
        alert('Address updated in Database Successfully');
        this.status = false;
        this.router.navigate(['display']);
      },
      (error) => {
        this.status = true;
        console.log('myError = ' + error.message);
      });
  }
}
