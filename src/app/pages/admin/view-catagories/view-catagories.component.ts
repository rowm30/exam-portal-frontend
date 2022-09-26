import { Component, OnInit } from '@angular/core';
import { CatagoryService } from 'src/app/services/catagory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-catagories',
  templateUrl: './view-catagories.component.html',
  styleUrls: ['./view-catagories.component.css']
})
export class ViewCatagoriesComponent implements OnInit {

  catagories=[
    {
      cid:23,
      title:'programming',
      description:'this is testing catagory'
    },
    {
      cid:23,
      title:'programming',
      description:'this is testing catagory'
    },
    {
      cid:23,
      title:'programming',
      description:'this is testing catagory'
    },
    {
      cid:23,
      title:'programming',
      description:'this is testing catagory'
    }
  ]

  constructor(private catagory:CatagoryService) { }

  ngOnInit(): void {
    this.catagory.catagories().subscribe(
      {
        next: (data:any)=>{
          this.catagories=data;
          console.log(this.catagories);
        },
        error: (error)=>{
          console.log(error);
          Swal.fire("Error!!","eeror in loading data",'error')
          
        }
      }
    )
  }

}
