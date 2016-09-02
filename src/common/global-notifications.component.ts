import {Component,
        Optional} from '@angular/core';
import {NotificationsOptions} from './notifications.options';
import {GlobalNotificationsService} from './notifications.service';
import {Notifications} from './notifications.component';

/**
 * Notifications component for global messages
 */
@Component(
{
    selector: "global-notifications",
    styles: 
    [`
        .notifications.global
        {
            position: fixed;
            right: 15px;
            top: 20px;
            z-index: 21312;
        }
    `],
    template:
   `<div [class]="cssClass">
        <notification *ngFor="let itm of notifications"
                      [item]="itm"
                      [visible]="itm.visible"
                      [clickToClose]="options.clickToClose"
                      [animated]="options.animations"
                      (closing)="closeItem($event)"
                      (closed)="removeItem($event)">
        </notification>
    </div>`
})
export class GlobalNotifications extends Notifications
{
    //######################### constructor #########################
    constructor(@Optional() options: NotificationsOptions,
                service: GlobalNotificationsService)
    {
        super(options, service);
        
        this.cssClass = "notifications global";
    }
}