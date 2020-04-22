import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  onLogin() {
    this.angularFireAuth.auth.
      signInWithEmailAndPassword(this.email, this.password).then(user => {
        console.log(this.email + " " + this.password)
        localStorage.setItem('isLoggedIn', 'yes')
        localStorage.setItem('email',this.email)
        this.router.navigate([''])
        this.router.navigate(['home']).then((res) => { window.location.reload(); })
      }).catch(error => {
        console.log(error)
      })
  }

}
