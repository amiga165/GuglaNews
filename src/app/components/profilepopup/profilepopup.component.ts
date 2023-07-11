import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { matDialogAnimations } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profilepopup',
  templateUrl: './profilepopup.component.html',
  styleUrls: ['./profilepopup.component.scss'],
})
export class ProfilepopupComponent implements OnInit {
  image: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    public _snackBar: MatSnackBar,
    public modalService: NgbModal,
    public _router: Router,
    public dialogRef: MatDialogRef<ProfilepopupComponent>
  ) {}
  newvtype = new FormGroup({
    name: new FormControl(''),
    mobile: new FormControl(''),

    address: new FormControl(''),
  });

  onImageSelected(event) {
    let me = this;
    console.log(me);
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result as string;
      this.image = this.image.replace(/^.+?;base64,/, '');
      console.log(this.image);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  onSubmit() {
    console.log('hi');
    console.log(this.newvtype.controls['name'].value);
    console.warn(this.newvtype.value);
    var dat = {
      name: this.newvtype.controls['name'].value,
      mobile: this.newvtype.controls['mobile'].value,
      address: this.newvtype.controls['address'].value,
      image: this.image,
    };
    this.dialogRef.close(`${JSON.stringify(dat)}`);

    /* this._api
      .postReq("vtype/add", {
        name: this.newvtype.controls["name"].value,
        brand: this.newvtype.controls["brand"].value,
        model: this.newvtype.controls["model"].value,
        image: this.image,
      })
      .then((res: any) => {
        this._snackBar.open(" Successfully Updated", "Close", {
          duration: 10000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ["ok"],
        });
      })
      .catch((e: any) => {
        this._snackBar.open(e.error.message, "Close", {
          duration: 10000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ["err"],
        });
      });*/
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
