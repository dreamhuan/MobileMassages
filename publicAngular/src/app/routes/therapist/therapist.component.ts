import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { NavSetting } from '../../shared/nav.setting';

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: [ './therapist.component.scss' ]
})
export class TherapistComponent implements OnInit {

  public chooses;

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.http.get('/assets/data/massage-therapists.json')
      .toPromise()
      .then((res) => {
        this.chooses = res.json();
      })
      .catch((err) => {
        console.log(err);
      });
    NavSetting.navInit(2)
  }


  booking() {
    this.router.navigate([ '/booking/step1' ]);
  }
}
