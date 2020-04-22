import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
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
  id: any

  constructor(public route: ActivatedRoute, db: AngularFireDatabase) {


    this.itemList = db.list('skills')


    this.route.params.subscribe(params => {
      this.id = params
      console.log("this.id 1 " + this.id['id'])
    })

    this.itemList.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y['$key'] = action.key

          if (action.key == this.id['id']) {
            console.log("key "+action.key)
            console.log("id "+this.id['id'])
            this.itemArray.push(y as ListeItemClass)
            this.data.fname = this.itemArray[0]['fname']
            this.data.lname = this.itemArray[0]['lname']
            this.data.email = this.itemArray[0]['email']
            this.data.phone = this.itemArray[0]['phone']
            this.data.adress = this.itemArray[0]['adress']
            this.data.skill = this.itemArray[0]['skill']
            this.data.price = this.itemArray[0]['price']
            this.data.notes = this.itemArray[0]['notes']


          }
        })
        console.log(this.itemArray[0]['adress'])
        console.log("data : "+this.data.email)

      })
  }



  ngOnInit() {
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
