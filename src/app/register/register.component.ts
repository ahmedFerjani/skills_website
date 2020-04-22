import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]

  itemList:AngularFireList<any>

  email:string='' ;
  password:string='' ;
  gender:string='' ; 
  birthday:string='' ; 
  lname:string='' ;
  fname:string='' ; 
  fullName:string='' ;
  selectedDay:string='' ; 
  selectedMonth:string='' ;
  selectedYear:string='' ; 
  phonenumber:string='' 


  constructor(private router:Router,private angularFireAuth: AngularFireAuth, 
    db: AngularFireDatabase) { 

      this.itemList = db.list('users')

    
  }

  ngOnInit() {
  }

  onRegistre()
  {
    this.fullName=this.fname+' '+this.lname
    if(this.selectedDay.length<2) {this.selectedDay='0'+this.selectedDay}
    this.birthday=this.selectedDay+'/'+this.selectedMonth+'/'+this.selectedYear
    console.log(this.gender)

    this.itemList.push({
      fullName: this.fullName,
      email: this.email,
      phone: this.phonenumber,
      gender: this.gender,
      birthday: this.birthday

    })

     this.angularFireAuth.auth.
    createUserWithEmailAndPassword(this.email,this.password).then(user=> {
      console.log(this.email+" "+this.password)
      this.router.navigate(['home'])
    }).catch(error=>
      {
        console.log(error)
      }) 
  }

}


export class ListeUserClass {
  $key: string;
  fullName: string;
  gender: string;
  email: string;
  phone: string;
  adress: string;
  birthday: string;
}