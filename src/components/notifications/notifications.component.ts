import {Component, OnDestroy, Input, Optional, PLATFORM_ID, Inject, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {extend} from '@jscrpt/common';
import {slideInOutTrigger} from '@anglr/animations';
import {Subscription} from 'rxjs';

import {NotificationsOptions, Notification, LocalNotificationsService, NotificationMessageOptions, NOTIFICATIONS_OPTIONS} from '../../common';
import {NotificationMessageComponent} from '../notificationMessage/notificationMessage.component';

/**
 * Default options for notifications component
 * @internal
 */
const defaultOptions: NotificationsOptions<any, NotificationMessageOptions<any>> =
{
    cssClasses:
    {
        rootDiv: 'notifications'
    },
    maxLength: 500,
    timeout: 10000,
    getNotificationMessageComponent: () => NotificationMessageComponent
};

/**
 * Notifications component for local messages
 */
@Component(
{
    selector: "notifications",
    styles:
    [`
        .notifications>notification
        {
            display: block;
            overflow: hidden;
        }
    `],
    templateUrl: 'notifications.component.html',
    animations: [slideInOutTrigger],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnDestroy
{
    //######################### private fields #########################

    /**
     * Array of active timeouts
     */
    private _timeouts: {[index: number]: any} = {};

    /**
     * Subscription for clearing event
     */
    private _clearingSubscription: Subscription|null = null;

    /**
     * Subscription for notifying event
     */
    private _notifyingSubscription: Subscription|null = null;

    /**
     * Represents notification options instance
     */
    private _options: NotificationsOptions<any, NotificationMessageOptions<any>>;

    //######################### public properties - template bindings #########################

    /**
     * Options used for notification message
     */
    @Input()
    public set options(options: NotificationsOptions<any, NotificationMessageOptions<any>>)
    {
        this._options = extend(true, this._options, options);
    }
    public get options(): NotificationsOptions<any, NotificationMessageOptions<any>>
    {
        return this._options;
    }

    //######################### public properties - template bindings #########################

    /**
     * Array of displayed notifications - displayed set
     * @internal
     */
    public notifications: Notification[] = [];

    //######################### constructor #########################
    constructor(service: LocalNotificationsService,
                private _changeDetector: ChangeDetectorRef,
                @Inject(PLATFORM_ID) platformId: Object,
                @Inject(NOTIFICATIONS_OPTIONS) @Optional() options?: NotificationsOptions<any, NotificationMessageOptions<any>>)
    {
        this._options = extend(true, {}, defaultOptions, options);

        if(!isPlatformBrowser(platformId))
        {
            return;
        }

        //removing all displayed items
        this._clearingSubscription = service.clearingMessages.subscribe(() =>
        {
            while(this.notifications.length > 0)
            {
                this.removeItem(this.notifications[0]);
            }

            this._changeDetector.detectChanges();
        });

        this._notifyingSubscription = service.notifying.subscribe((itm: Notification) =>
        {
            var id = 0;

            if(this.notifications.length > 0)
            {
                id = this.notifications[this.notifications.length - 1].id + 1;
            }

            itm.id = id;

            if(itm.message.length > this.options.maxLength)
            {
                itm.message = itm.message.substr(0, this.options.maxLength) + " ...";
            }

            if(this.options.timeout > 0)
            {
                this._timeouts[id] = setTimeout(() =>
                {
                    this.removeItem(itm);
                    this._changeDetector.detectChanges();
                }, this.options.timeout);
            }

            this.addItem(itm);

            this._changeDetector.detectChanges();
        });
    }

    //######################### public methods #########################

    /**
     * Adds notification item to list
     * @param  {Notification} item Item to be added
     */
    public addItem(item: Notification)
    {
        this.notifications.push(item);
    }

    /**
     * Removes notification item from list
     * @param  {number} item Item to be removed
     */
    public removeItem(item: Notification)
    {
        var index = this.notifications.indexOf(item);

        if (index > -1)
        {
            clearTimeout(this._timeouts[item.id]);
            delete this._timeouts[item.id];
            this.notifications.splice(index, 1);
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._clearingSubscription)
        {
            this._clearingSubscription.unsubscribe();
            this._clearingSubscription = null;
        }

        if(this._notifyingSubscription)
        {
            this._notifyingSubscription.unsubscribe();
            this._notifyingSubscription = null;
        }
    }
}