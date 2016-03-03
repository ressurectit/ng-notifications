import {Component,
        Inject,
        Optional} from 'angular2/core';
import {NotificationsOptions} from './notifications.options';
import {NotificationsService, GLOBAL_NOTIFICATION_SERVICE} from './notifications.service';
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
        }
    `],
    template:
   `<div class="notifications global">
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
                @Inject(GLOBAL_NOTIFICATION_SERVICE) service: NotificationsService)
    {
        super(options, service);
    }
}