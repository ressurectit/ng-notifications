import {Component, OnDestroy, Input, Optional, PLATFORM_ID, Inject, ChangeDetectionStrategy, ChangeDetectorRef, OnInit} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Notification} from '@anglr/common';
import {extend} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {NotificationsOptions, NOTIFICATIONS_OPTIONS} from '../../common/notifications.interface';
import {LocalNotificationsService} from '../../common/notifications.service';
import {NotificationMessageComponent} from '../notificationMessage/notificationMessage.component';

/**
 * Default options for notifications component
 * @internal
 */
const defaultOptions: NotificationsOptions =
{
    cssClasses:
    {
        rootDiv: 'notifications'
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscription all subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    /**
     * Represents notification options instance
     */
    protected _options: NotificationsOptions;

    //######################### public properties - template bindings #########################

    /**
     * Options used for notification message
     */
    @Input()
    public get options(): NotificationsOptions
    {
        return this._options;
    }
    public set options(options: NotificationsOptions)
    {
        this._options = extend(true, this._options, options);
    }

    //######################### public properties - template bindings #########################

    /**
     * Array of displayed notifications - displayed set
     * @internal
     */
    public notifications: readonly Notification[] = [];

    //######################### constructor #########################
    constructor(protected _service: LocalNotificationsService,
                protected _changeDetector: ChangeDetectorRef,
                @Inject(PLATFORM_ID) protected _platformId: Object,
                @Inject(NOTIFICATIONS_OPTIONS) @Optional() options?: NotificationsOptions)
    {
        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        if(!isPlatformBrowser(this._platformId))
        {
            return;
        }

        this.notifications = this._service.notifications;

        this._initSubscriptions.add(this._service.notificationsChange.subscribe(() =>
        {
            this.notifications = this._service.notifications;

            this._changeDetector.detectChanges();
        }));
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions?.unsubscribe();
        this._initSubscriptions = null;
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
        this._service.remove(item);
    }
}