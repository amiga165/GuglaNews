import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

ionViewWillLeave() {
    let listaFrames = document.getElementsByTagName("iframe");
    // for (var index = 0; index < listaFrames.length; index++) {
    //     let iframe = listaFrames[index].contentWindow;          
    //     iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    //  }
}

}
