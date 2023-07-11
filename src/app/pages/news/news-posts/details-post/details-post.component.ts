import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.scss'],
})
export class DetailsPostComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal(detail:string){
      this.modalCtrl.dismiss({role:detail});
  }

}
