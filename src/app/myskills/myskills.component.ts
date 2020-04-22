import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  selector: 'app-myskills',
  templateUrl: './myskills.component.html',
  styleUrls: ['./myskills.component.css']
})
export class MyskillsComponent implements OnInit {

  itemList: AngularFireList<any>
  public itemArray = []
  currentEmail:string = this.angularFireAuth.auth.currentUser.email ; 
  currentUserUid = this.angularFireAuth.auth.currentUser.uid;
  currentUserKey = this.db.object(`users/${this.currentUserUid}`);

  data = {
    $key: '',
    fname: '',
    lname: '',
    email: '',
    phone: '',
    adress: '',
    skill: '',
    price: '',
    notes: ' '
  }

  constructor(private db: AngularFireDatabase,private angularFireAuth: AngularFireAuth) {
    this.itemList = db.list('skills')
    this.itemList.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y['$key'] = action.key
          this.itemArray.push(y as ListeItemClass)
        })
      })
    console.log(this.itemArray)
  }

  ngOnInit() {

  }


  onEdit($key, fname, lname, email, phone, adress, skill, price, notes) {

    this.data = {
      "$key": $key, "fname": fname, "lname": lname, "email": email,
      "phone": phone, "adress": adress, "skill": skill, "price": price, "notes": notes
    };

  }


  onSave() {
     this.check()

     this.itemList.set(this.data.$key,{
      fname: this.data.fname,
      lname: this.data.lname,
      email: this.data.email,
      phone: this.data.phone,
      adress: this.data.adress,
      skill: this.data.skill,
      price: this.data.price,
      notes: this.data.notes
    }); 

    this.itemArray = []

    
     window.location.reload();
 

  }

  onDelete($key) {
    this.itemList.remove($key) 
    this.itemArray = []
  }


  check()
  {
    if (this.data.fname == undefined) {
      this.data.fname = " "
    }
    if (this.data.lname == undefined) {
      this.data.lname = " "
    }
    if (this.data.email == undefined) {
      this.data.email = " "
    }
    if (this.data.adress == undefined) {
      this.data.adress = " "
    }
    if (this.data.skill == undefined) {
      this.data.skill = " "
    }
    if (this.data.price == undefined) {
      this.data.price = " "
    }
    if (this.data.notes == undefined) {
      this.data.notes = " "
    }
  }



}


export class ListeItemClass {


  $key: string;
  fname: string;
  lname: string;
  email: string;
  phone: string ;
  adress: string;
  skill: string;
  price: string;
  notes: string;
}