import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-page-not-found',
  template: `
  <div class="panel panel-primary">
    <div class="panel-heading">
      Error 404: Page Not Found
    </div>
    <div class="panel-body">
      <div class="row">
        <h3 class="text-center">This is not the page you were looking for!</h3>
        <br>
      </div>
      <div class="row" >
        <img src="./assets/images/logo.jpg" 
            class="img-responsive center-block"
            style="max-height:300px;padding-bottom:50px"/>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
