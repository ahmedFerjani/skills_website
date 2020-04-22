import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router' ; 


@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {

  data= {
    fname: '',
    lname: '',
    email: this.angularFireAuth.auth.currentUser.email,
    phone: '',
    adress: '',
    skill: '',
    price: '',
    notes: '',
    uid: '' 
  }

  itemList:AngularFireList<any>
  
  constructor(db: AngularFireDatabase,public router:Router, 
    private angularFireAuth: AngularFireAuth) { 
    this.itemList = db.list('skills')
   
  }

  ngOnInit() {
  }

  insertSkill()
  {
    this.itemList.push({
      fname: this.data.fname,
      lname: this.data.lname,
      email: this.data.email,
      phone: this.data.phone,
      adress: this.data.adress,
      skill: this.data.skill,
      price: this.data.price,
      notes: this.data.notes,
      uid : this.angularFireAuth.auth.currentUser.uid
    })
    this.router.navigate(['/myskills']) 
  }

}
