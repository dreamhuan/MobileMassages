import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import 'jquery'
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
declare var $:any;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: [ './test.component.scss' ]
})
export class TestComponent implements OnInit {

  private api_url = '/assets/data/price.json';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public prices;
public testHTML = '<div style="color: red; font-size: 20px">xxxxxxxxx</div>';
  constructor(private http: Http) { }
  ngOnInit() {
    console.log('测试jQuery');
    console.log('版本: ' + $.fn.jquery);
    $('div').click(e => {
      console.log($(e.target).text());
      e.stopPropagation();
    });

    this.http
      .get(this.api_url)
      .toPromise()
      .then(res => {
        console.log(res.json());
        this.prices = res.json();
      })
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  sweeralert2(){
    swal('测试SweetAlert2', 'Hello world!', 'success');
  }
}
