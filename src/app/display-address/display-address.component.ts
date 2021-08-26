import { Component, OnInit } from '@angular/core';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-display-address',
  templateUrl: './display-address.component.html',
  styleUrls: ['./display-address.component.css']
})
export class DisplayAddressComponent implements OnInit {
  data: any;
  status = false;

  constructor(private person: PersonService) { }

  closeAlert() {
    this.status = false;
  }

  ngOnInit(): void {

    this.person.getApidata().subscribe((obj: any) => {
      this.data = obj;
      // console.log(obj)
    },
      (error) => {
        this.status = true;
        console.log('myError = ' + error.message);
      });
  }
  deleteAddress(id: number) {
    if (window.confirm('Are sure you want to delete this Address ?')) {
      this.person.deleteAddress(id).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
