import {Component, Optional, PLATFORM_ID, ChangeDetectorRef, Inject, ChangeDetectionStrategy} from '@angular/core';
import {slideInOutTrigger} from '@anglr/animations';

import {NotificationsOptions, GlobalNotificationsService} from '../../common';
import {NotificationsComponent} from '../notifications/notifications.component';

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
    templateUrl: 'globalNotifications.component.html',
    animations: [slideInOutTrigger],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalNotificationsComponent extends NotificationsComponent
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