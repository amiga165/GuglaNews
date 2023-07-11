import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-appupdate',
  templateUrl: './appupdate.component.html',
  styleUrls: ['./appupdate.component.scss'],
})
export class AppupdateComponent implements OnInit {
  @Input() app_info:any;
  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {
    this.app_info=this.app_info;
    console.log('appinfoooo'+JSON.stringify(this.app_info));
  }

  close_modal(){
		this.modalCtrl.dismiss({
		  status: 'success'
		});
	  }
}
