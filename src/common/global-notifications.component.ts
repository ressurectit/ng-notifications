import {Component,
        Optional, 
        PLATFORM_ID, 
        ChangeDetectorRef,
        Inject,
        ChangeDetectionStrategy} from '@angular/core';
import {slideInOutTrigger} from '@anglr/animations';

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
        <notification *ngFor="let itm of notifications"
                      [@slideInOut]
                      [item]="itm"
                      [clickToClose]="options.clickToClose"
                      (closed)="removeItem($event)">
        </notification>
    </div>`,
    animations: [slideInOutTrigger],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalNotifications extends Notifications
{
    //######################### constructor #########################
    constructor(service: GlobalNotificationsService,
                changeDetector: ChangeDetectorRef,
                @Inject(PLATFORM_ID) platformId: Object,
                @Optional() options?: NotificationsOptions)
    {
        super(service, changeDetector, platformId, options);
        
        this.cssClass = "notifications global";
    }
}