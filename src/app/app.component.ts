import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from 'src/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
   animations: [ // <-- add your animations here
    fader,
    // slider,
    // transformer,
    // stepper
  ]
})
export class AppComponent {
  title = 'ecommerceApp';

  // prepareRoute(outlet: RouterOutlet) {
    // console.log(outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']);
    // return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }
}
