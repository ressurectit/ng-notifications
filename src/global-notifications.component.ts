import {Component,
        Inject,
        Optional} from 'angular2/core';
import {NotificationsOptions} from './notifications.options';
import {NotificationsService, GlobalNotificationsService} from './notifications.service';
import {NotificationMessage} from './notification.message.component';
import {Notifications, GLOBAL_NOTIFICATION_OPTIONS} from './notifications.component';

/**
 * Notifications component for global messages
 */
@Component(
{
    selector: "global-notifications",
    directives: [NotificationMessage],
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
        <notification *ngFor="#itm of notifications"
                      [item]="itm"
                      [clickToClose]="options.clickToClose"
                      (closing)="removeItem($event)">
        </notification>
    </div>`
})
export class GlobalNotifications extends Notifications
{
    //######################### constructor #########################
    constructor(@Optional() @Inject(GLOBAL_NOTIFICATION_OPTIONS) options: NotificationsOptions,
                service: GlobalNotificationsService)
    {
        super(options, service);
        
        this.cssClass = "notifications global";
    }
}