import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { NavSetting } from '../../shared/nav.setting';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: [ './faq.component.scss' ]
})
export class FaqComponent implements OnInit {

  public items;

  constructor(private http: Http) { }

  ngOnInit() {

    this.http.get('/assets/data/faq.json')
      .toPromise()
      .then((res) => {
        this.items = res.json();
      })
      .catch((err) => {
        console.log(err);
      });
    NavSetting.navInit(5)

  }

}
