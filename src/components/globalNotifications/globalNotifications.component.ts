import {Component, Optional, PLATFORM_ID, ChangeDetectorRef, Inject, ChangeDetectionStrategy} from '@angular/core';
import {NgClass} from '@angular/common';
import {extend} from '@jscrpt/common/extend';

import {NotificationsOptions, NOTIFICATIONS_OPTIONS} from '../../common/notifications.interface';
import {GlobalNotificationsService} from '../../common/notifications.service';
import {NotificationsComponent} from '../notifications/notifications.component';
import {NotificationMessageComponent} from '../notificationMessage/notificationMessage.component';
import {MessageRendererDirective} from '../../directives';

/**
 * Default options for notifications component
 * @internal
 */
const defaultOptions: NotificationsOptions =
{
    cssClasses:
    {
        rootDiv: 'notifications global',
    },
    getNotificationMessageComponent: () => NotificationMessageComponent,
};

/**
 * Notifications component for global messages
 */
@Component(
{
    selector: 'global-notifications',
    styleUrl: 'globalNotifications.component.css',
    templateUrl: 'globalNotifications.component.html',
    imports:
    [
        NgClass,
        MessageRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalNotificationsComponent extends NotificationsComponent
{
    //######################### constructor #########################
    constructor(service: GlobalNotificationsService,
                changeDetector: ChangeDetectorRef,
                @Inject(PLATFORM_ID) platformId: object,
                @Inject(NOTIFICATIONS_OPTIONS) @Optional() options?: NotificationsOptions)
    {
        super(service, changeDetector, platformId, options);

        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }
}