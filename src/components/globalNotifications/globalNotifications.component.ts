import {Component, Optional, PLATFORM_ID, ChangeDetectorRef, Inject, ChangeDetectionStrategy} from '@angular/core';
import {extend} from '@jscrpt/common';

import {NotificationsOptions, NOTIFICATIONS_OPTIONS} from '../../common/notifications.interface';
import {GlobalNotificationsService} from '../../common/notifications.service';
import {NotificationsComponent} from '../notifications/notifications.component';
import {NotificationMessageComponent} from '../notificationMessage/notificationMessage.component';

/**
 * Default options for notifications component
 * @internal
 */
const defaultOptions: NotificationsOptions =
{
    cssClasses:
    {
        rootDiv: 'notifications global'
    },
    getNotificationMessageComponent: () => NotificationMessageComponent
};

/**
 * Notifications component for global messages
 */
@Component(
{
    selector: 'global-notifications',
    styleUrls: ['globalNotifications.component.css'],
    templateUrl: 'globalNotifications.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalNotificationsComponent extends NotificationsComponent
{
    //######################### constructor #########################
    constructor(service: GlobalNotificationsService,
                changeDetector: ChangeDetectorRef,
                @Inject(PLATFORM_ID) platformId: Object,
                @Inject(NOTIFICATIONS_OPTIONS) @Optional() options?: NotificationsOptions)
    {
        super(service, changeDetector, platformId, options);

        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }
}