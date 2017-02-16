import {Component,
        Optional} from '@angular/core';
import {SlideInOutAnimation} from '@anglr/animations';

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

        .notifications.global>notification
        {
            display: block;
            overflow: hidden;
        }
    `],
    template:
   `<div [class]="cssClass">
        <notification *ngFor="let itm of _notifications"
                      [@slideInOut]
                      [item]="itm"
                      [clickToClose]="options.clickToClose"
                      (closed)="removeItem($event)">
        </notification>
    </div>`,
    animations: [SlideInOutAnimation]
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