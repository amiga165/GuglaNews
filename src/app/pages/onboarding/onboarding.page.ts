import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  slideOpts: any;

  constructor( private router: Router,) { }

  ngOnInit() {
  }


  async next() {
    this.slides.slideNext();
  }

  async goToLogin() {
    localStorage.setItem("onboarding", "true");
    this.router.navigateByUrl('/news/allnews', { replaceUrl: true });
  }

}
