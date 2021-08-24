import { Component, OnInit } from '@angular/core';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-display-address',
  templateUrl: './display-address.component.html',
  styleUrls: ['./display-address.component.css']
})
export class DisplayAddressComponent implements OnInit {
  data: any;

  constructor(private person: PersonService) {}

  ngOnInit(): void {
    
    this.person.getApidata().subscribe((obj: any) => {
      this.data = obj;
      console.log(obj)
    })
  }
  deleteAddress(id:number){
    if(window.confirm('Are sure you want to delete this Address ?')){
      this.person.deleteAddress(id).subscribe(()=>{
      window.location.reload();
    })
    }
  }
}
