import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject, EMPTY, throwError } from "rxjs";
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  itemList: AngularFireList<any>
  public itemArray = []
  data = {
    $key: '',
    birthday: '',
    email: '',
    fullName: '',
    gender: '',
    phone: '',
    image: ''
  }
  id: any

  ref: AngularFireStorageReference
  task: AngularFireUploadTask
  downloadURl: Observable<string>;
  url: any;


  constructor(db: AngularFireDatabase,
    public afStorage: AngularFireStorage) {
    this.itemList = db.list('users')

    this.itemList.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y['$key'] = action.key
          console.log(action.key)
          console.log('current email : ' + localStorage.getItem('email'))
          if (((y as ListeItemClass)['email']) == localStorage.getItem('email')) {
            console.log('ok')
            this.itemArray.push(y as ListeItemClass)
            this.data.$key = this.itemArray[0]['$key']
            this.data.birthday = this.itemArray[0]['birthday']
            this.data.email = this.itemArray[0]['email']
            this.data.fullName = this.itemArray[0]['fullName']
            this.data.gender = this.itemArray[0]['gender']
            this.data.phone = this.itemArray[0]['phone']
            this.data.image = this.itemArray[0]['image']
          }

        })
        /*        console.log(this.itemArray[0]['adress'])
               console.log("data : " + this.data.email) */

      })
  }

  onEdit() {
    this.itemList.set(this.data.$key, {
      fullName: this.data.fullName,
      email: this.data.email,
      phone: this.data.phone,
      birthday: this.data.birthday,
      gender: this.data.gender
    }).then(() => { window.location.reload() });
  }

  upload(event) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref(randomId);
    const file = event.target.files[0];
    this.task = this.ref.put(file);

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          console.log(url); // <-- do what ever you want with the url..
          
            this.itemList.set(this.data.$key, {
              fullName: this.data.fullName,
              email: this.data.email,
              phone: this.data.phone,
              birthday: this.data.birthday,
              gender: this.data.gender,
              image: url
            });
          
        
        });
      })
    ).subscribe();
  }


  ngOnInit() {
  }

}


export class ListeItemClass {
  $key: string;
  birthday: string;
  email: string;
  fullName: string;
  gender: string;
  phone: string;
}
