import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad,Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../providers/user/user.service'

@Injectable({
  providedIn: 'root'
})
export class GaurdGuard implements CanLoad {
  constructor(
    public router: Router,
    public user: UserService,)
   { }
  async canLoad(): Promise<boolean>{
    if (this.user.isOkay()){
      return true;
    }
    else{

      const OBValue = localStorage.getItem("onboarding");
      if (OBValue == "true"){
        this.router.navigateByUrl('news/allnews', { replaceUrl: true });
        return false;
      }
      else{
        this.router.navigate(['signup']);
        return true;
      }
    }
  }
  
}
