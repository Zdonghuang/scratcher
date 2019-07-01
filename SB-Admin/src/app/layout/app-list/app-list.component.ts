import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-app-list',
    templateUrl: './app-list.component.html',
    styleUrls: ['./app-list.component.scss'],
    animations: [routerTransition()]
})
export class AppListComponent implements OnInit {
    constructor() {}

    ngOnInit() {
    }
}
