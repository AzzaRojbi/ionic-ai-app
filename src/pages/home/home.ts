import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

declare const ApiAIPromises: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  answer;  

  constructor(public navCtrl: NavController, public platform: Platform, public ngZone: NgZone) {
    platform.ready().then(() => {

      ApiAIPromises.init({
        clientAccessToken: "c2f84979143a48519f2210714a2fbbff"
      })
      .then((result) =>  console.log(result))

    });
  }


  ask(question) {
    ApiAIPromises.requestText({
      query: question
    })
    .then(({result: {fulfillment: {speech}}}) => {
       this.ngZone.run(()=> {
         this.answer = speech;
       });
    })
  }

}
