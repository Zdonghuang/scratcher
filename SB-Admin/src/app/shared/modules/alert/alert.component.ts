import { Component, OnInit, NgZone } from '@angular/core';
import { trigger, transition, style, state, animate } from '@angular/animations';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('void => *',
        animate(100, style({ transform: 'scale3d(.3, .3, .3)' })))
    ])
  ]
})
export class AlertComponent implements OnInit {
  // hide and show alert
  modalStatus: boolean;
  // custom settings
  title: string;
  type: string;
  time: number;
  body: string;
  // default settings
  color: string;
  backColor: string;

  constructor(
    private alertService: AlertService,
    private _ngZone: NgZone
  ) { }

  ngOnInit() {
    this.alertService.alertSettings$.subscribe(
      (data) => {
        this.title = data.title;
        this.type = data.type;
        this.time = data.time;
        this.body = data.body;

        if (this.type === 'danger') {
          this.backColor = '#dc3545';
        }
        if (this.type === 'infor') {
          this.backColor = '#117a8b';
        }
        if (this.type === 'success') {
          this.backColor = '#28a745';
        }

        // show alert
        this.modalStatus = true;

        // hide alert after given time
        this._ngZone.runOutsideAngular(() =>
          setTimeout(() =>
            this._ngZone.run(() =>
              this.modalStatus = false
            ), this.time
          )
        );
      }
    );
  }

  // close alert afert click on ok and cross
  resolve() {
    this.modalStatus = false;
  }
}
