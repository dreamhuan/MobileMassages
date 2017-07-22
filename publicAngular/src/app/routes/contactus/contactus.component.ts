import { Component, OnInit } from '@angular/core';
import { NavSetting } from '../../shared/nav.setting';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      NavSetting.navInit(6)
  }

}
