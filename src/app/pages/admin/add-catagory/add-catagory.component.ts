import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CatagoryService } from 'src/app/services/catagory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-catagory',
  templateUrl: './add-catagory.component.html',
  styleUrls: ['./add-catagory.component.css']
})
export class AddCatagoryComponent implements OnInit {


  catagory={
    title:'',
    description:''

  };

  

  constructor(private _catagory:CatagoryService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.catagory.title.trim()=='' || this.catagory.title.trim==null ){
      this._snack.open("Title required!!",'X',{
        duration:3000
      })
      return;
    }

    this._catagory.addCatagory(this.catagory).subscribe(
      {
        next:(data:any)=>{
          this.catagory.title=''
          this.catagory.description=''
          Swal.fire('Success','Catagory is added successfully','success');

        },
        error:(error: Error)=>{
          console.log(error);
          Swal.fire('Error','Catagory is added successfully','error');
          
        },
        complete:()=>{}
      }
    )
  }

}


