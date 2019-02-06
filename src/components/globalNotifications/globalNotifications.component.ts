import {Component, Optional, PLATFORM_ID, ChangeDetectorRef, Inject, ChangeDetectionStrategy} from '@angular/core';
import {extend} from '@jscrpt/common';

import {NotificationsOptions, GlobalNotificationsService, NotificationMessageOptions, NOTIFICATIONS_OPTIONS} from '../../common';
import {NotificationsComponent} from '../notifications/notifications.component';
import {NotificationMessageComponent} from '../notificationMessage/notificationMessage.component';

/**
 * Default options for notifications component
 * @internal
 */
const defaultOptions: NotificationsOptions<any, NotificationMessageOptions<any>> =
{
    cssClasses:
    {
        rootDiv: 'notifications global'
    },
    maxLength: 500,
    timeout: 10000,
    getNotificationMessageComponent: () => NotificationMessageComponent
};

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalNotificationsComponent extends NotificationsComponent
{
    //######################### constructor #########################
    constructor(service: GlobalNotificationsService,
                changeDetector: ChangeDetectorRef,
                @Inject(PLATFORM_ID) platformId: Object,
                @Inject(NOTIFICATIONS_OPTIONS) @Optional() options?: NotificationsOptions<any, NotificationMessageOptions<any>>)
    {
        super(service, changeDetector, platformId, options);

        this._options = extend(true, {}, defaultOptions, options);
    }
}