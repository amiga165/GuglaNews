import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../../providers/user/user.service'
import {Router} from '@angular/router';
import {CenterService} from '../../providers/center/center.service'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(
    public router: Router,
    public user: UserService,
    public center: CenterService,
    )
   { }
  async canLoad(): Promise<boolean>{
    if (this.user.isOkay() || this.center.isOkay()){
      // console.log("USer is okay");
      this.router.navigateByUrl('news', { replaceUrl: true });
      return true;
    }
    else{
      // this.router.navigate(['signup']);
      return true;
    }
  }
  
}

