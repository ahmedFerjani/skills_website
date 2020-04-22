import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  private user: Observable<firebase.User>;
  public isLoggedin: boolean = false;
  private email: string;




  constructor(public auth: AngularFireAuth, public router: Router) {

    if (localStorage.getItem('isLoggedIn') == 'yes') {
      this.isLoggedin = true
    }
    else { this.isLoggedin = false }

    /*   this.user = auth.authState 
      console.log("isLoggedin = "+this.isLoggedin) */
    /*     firebase.auth().onAuthStateChanged(function(user) {
          console.log("Fire isLoggedin = "+this.isLoggedin)
          console.log("user : "+user)
          if (user) {
            this.isLoggedin = true 
          } else {
            this.isLoggedin = false
            this.router.navigate(['/login'])
          }
        });  */
  }



  logout() {
    this.auth.auth.signOut()
    localStorage.setItem('isLoggedIn', 'no')
    this.isLoggedin = false
  }

  ngOnInit() {
  }

}
