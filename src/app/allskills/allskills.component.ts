import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';


@Component({
  selector: 'app-allskills',
  templateUrl: './allskills.component.html',
  styleUrls: ['./allskills.component.css']
})
export class AllskillsComponent implements OnInit {
  itemList: AngularFireList<any>
  public itemArray = []

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

  constructor(db: AngularFireDatabase, private route : Router) {
    this.itemList = db.list('skills')

    this.itemList.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y['$key'] = action.key
          this.itemArray.push(y as ListeItemClass)
          console.log(this.itemArray)
        })
      })
  }

  ngOnInit() {

  }


  onDetails(key)
  {
    console.log(key)
    this.route.navigate(['details/'+key])
  }

}

export class ListeItemClass {
  $key: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  adress: string;
  skill: string;
  price: string;
  notes: string;
}

