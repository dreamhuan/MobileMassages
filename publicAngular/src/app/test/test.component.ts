import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('测试jQuery');
    console.log($.fn);
    $('div').click(e => {
      console.log($(e.target).text());
      e.stopPropagation();
    });
  }
}
