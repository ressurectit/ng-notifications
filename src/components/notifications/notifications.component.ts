import {Component, OnDestroy, Input, Optional, PLATFORM_ID, Inject, ChangeDetectionStrategy, ChangeDetectorRef, OnInit} from '@angular/core';
import {isPlatformBrowser, NgClass} from '@angular/common';
import {Notification} from '@anglr/common';
import {extend} from '@jscrpt/common/extend';
import {Subscription} from 'rxjs';

import {NotificationsOptions, NOTIFICATIONS_OPTIONS} from '../../common/notifications.interface';
import {LocalNotificationsService} from '../../common/notifications.service';
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
        rootDiv: 'notifications',
    },
    getNotificationMessageComponent: () => NotificationMessageComponent
};

/**
 * Notifications component for local messages
 */
@Component(
{
    selector: 'notifications',
    templateUrl: 'notifications.component.html',
    imports:
    [
        NgClass,
        MessageRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscription all subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Represents notification options instance
     */
    protected ɵoptions: NotificationsOptions;

    //######################### public properties - template bindings #########################

    /**
     * Options used for notification message
     */
    @Input()
    public get options(): NotificationsOptions
    {
        return this.ɵoptions;
    }
    public set options(options: Partial<NotificationsOptions>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options);
    }

    //######################### public properties - template bindings #########################

    /**
     * Array of displayed notifications - displayed set
     * @internal
     */
    public notifications: readonly Notification[] = [];

    //######################### constructor #########################
    constructor(protected service: LocalNotificationsService,
                protected changeDetector: ChangeDetectorRef,
                @Inject(PLATFORM_ID) protected platformId: object,
                @Inject(NOTIFICATIONS_OPTIONS) @Optional() options?: NotificationsOptions)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        if(!isPlatformBrowser(this.platformId))
        {
            return;
        }

        this.notifications = this.service.notifications;

        this.initSubscriptions.add(this.service.notificationsChange.subscribe(() =>
        {
            this.notifications = this.service.notifications;

            this.changeDetector.detectChanges();
        }));
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
    }

    //######################### public methods #########################

    /**
     * Removes notification item from list
     * @param item - Item to be removed
     *
     * @internal
     */
    public removeItem(item: Notification): void
    {
        this.service.remove(item);
    }
}
