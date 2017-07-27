import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: [ './administration.component.scss' ]
})
export class AdministrationComponent implements OnInit {

  public items;

  constructor(private http: Http) { }

  ngOnInit() {

    this.http.get('../data/order.json')
      .toPromise()
      .then((res) => {
        this.items = res.json();
      });
  }

}
