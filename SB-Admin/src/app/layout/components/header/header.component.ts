import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../shared/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent implements OnInit {
  public pushRightClass: string;
  public username = '';
  public isDevice = false;
  public searchs = '';
  loginTime = localStorage.getItem('loginTime');
  constructor(private translate: TranslateService, public router: Router, public userService: UserService) {
    this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

    this.router.events.subscribe(val => {
        if (val instanceof NavigationEnd) {
            val.url.indexOf('device') === -1 ? (this.isDevice = false) : (this.isDevice = true);
            if (window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        }
    //   if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
    //     this.toggleSidebar();
    //   }
    });
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.getToken();
    this.checkTime();
  }

  // device search
  keyUpSearch(val) {
      if (this.isDevice) {
          this.router.navigate(['/layout/device/device-search', val]);
      }
  }
  checkTime() {
    const logoutTime = new Date().getTime() - Number(this.loginTime);
    if (logoutTime > 3595000) {
      this.userService.logout();
    } else {
      const getLogoutTime = 3595000 - logoutTime;
      setTimeout(() => {
        this.userService.logout();
      }, getLogoutTime);
    }
  }
  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  getToken() {
    if (!this.userService.isLoggedIn()) {
      this.userService.logout();
    } else {
      this.username = this.userService.getCurrentUser().username;
    }
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    this.userService.logout();
  }

  changeLang(language: string) {
    this.translate.use(language);
  }
}
