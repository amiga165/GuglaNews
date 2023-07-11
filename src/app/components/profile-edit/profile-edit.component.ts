import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { APIService } from 'src/app/providers/api/api.service';
import { CommonService } from 'src/app/providers/common/common.service';
import { UserService } from 'src/app/providers/user/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {

  @Input() user_details:any;

  updating_data = {
    name:'',
    email:''
  }

  constructor(public modalCtrl:ModalController,
              public api:APIService,
              public commin:CommonService,
              public user:UserService) { }

  ngOnInit() {
    this.user_details = this.user_details,
    this.updating_data.name = this.user_details.details.name,
    this.updating_data.email = this.user_details.details.email
  }


  close_modal(){
    this.modalCtrl.dismiss({
      status: 'success'
    });
  }


  submit() {
	
			this.commin.startLoader();
			this.user.updateUserDetails(this.updating_data).then(() => {
				this.commin.stopLoader();
			});	
      this.close_modal();
	}

}
