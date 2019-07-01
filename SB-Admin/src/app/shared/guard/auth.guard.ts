import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, public user: UserService) {}

    canActivate() {
        if (this.user.isLoggedIn()) {
            return true;
        }

        this.user.logout();
        return false;
    }
}
