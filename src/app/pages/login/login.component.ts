import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:''
  }

  constructor(private snack:MatSnackBar, private login:LoginService) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("Login Button Clixk");
    if (this.loginData.username.trim()==''||this.loginData.username==null) {
      {
        this.snack.open('Username is required!!','X',{
          duration:3000,
        });
        return;
      }
    }
    if (this.loginData.password.trim()==''||this.loginData.password==null) {
      {
        this.snack.open('Password is required!!','X',{
          duration:3000,
        });
        return;
      }
    }

    // request to server to generate token
    this.login.generateToken(this.loginData).subscribe({
      next :(data:any)=>{
        console.log("success");
        console.log(data);  
        
        // login ...

        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            // redirect... ADMIN : admin-dashboard
            if(this.login.getUserRole()=="ADMIN"){
              // admin dashboard
              window.location.href='/admin'
            }else if(this.login.getUserRole()=='NORMAL'){
              // normal user dashboard
              window.location.href='/user-dashboard'
            }else{
              this.login.logout();
            }
            // redirect... Normal : normal-dashboard
          }
        )
      },
      error:(error)=>{
        console.log("Error");
        console.log(error);  
        this.snack.open("Invalid Detail",'X',{
          duration:3000
        })
      },
      complete : () => console.log("hello")
      
  
    })
  }
}
