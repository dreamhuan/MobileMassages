import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { NavSetting } from '../../shared/nav.setting';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.scss']
})
export class StylesComponent implements OnInit {

  public datas;
  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.http.get('/assets/data/home-massage-type.json')
      .toPromise()
      .then((res) => {
        this.datas = res.json();
      })
      .catch((err) => {
        console.log(err);
      });
    NavSetting.navInit(3)
  }

  booking() {
    this.router.navigate([ '/booking/step1' ]);
  }
}
