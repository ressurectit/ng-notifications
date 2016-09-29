import {Component,
        OnDestroy,
        Input,
        Optional} from '@angular/core';
import {SlideInOutAnimation} from '@ng2/animations';

import {NotificationsOptions} from './notifications.options';
import {Notification} from './notification';
import {LocalNotificationsService} from './notifications.service';
import {Subscription} from 'rxjs/Subscription';

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
    template:
   `<div [class]="cssClass">
        <notification *ngFor="let itm of _notifications"
                      [@slideInOut]
                      [item]="itm"
                      [clickToClose]="options.clickToClose"
                      (closed)="removeItem($event)">
        </notification>
    </div>`,
    animations: [SlideInOutAnimation]
})
export class Notifications implements OnDestroy
{
    //######################### private fields #########################

    /**
     * Array of active timeouts
     */
    private _timeouts: {[index: number]: any} = {};

    /**
     * Subscription for clearing event
     */
    private _clearingSubscription: Subscription = null;

    /**
     * Subscription for notifying event
     */
    private _notifyingSubscription: Subscription = null;

    /**
     * Array of displayed notifications - displayed set
     */
    private _notifications: Notification[] = [];

    //######################### public properties - inputs #########################

    /**
     * Css class that is assigned to root element of notifications
     */
    @Input()
    public cssClass: string = "notifications";

    //######################### constructor #########################
    constructor(@Optional() public options: NotificationsOptions,
                service: LocalNotificationsService)
    {
        if(options && !(options instanceof NotificationsOptions))
        {
            this.options = null;
            console.warn("Provided configuration for 'Notifications' is not of type 'NotificationsOptions' and will be ignored!");
        }

        this.options = options || new NotificationsOptions(10000, true, 500);

        //removing all displayed items
        this._clearingSubscription = service.clearingMessages.subscribe(() =>
        {
            this._notifications.forEach(notification =>
            {
                this.removeItem(notification);
            });
        });

        this._notifyingSubscription = service.notifying.subscribe((itm: Notification) =>
        {
            var id = 0;

            if(this._notifications.length > 0)
            {
                id = this._notifications[this._notifications.length - 1].id + 1;
            }

            itm.id = id;

            if(itm.message.length > this.options.maxLength)
            {
                itm.message = itm.message.substr(0, this.options.maxLength) + " ...";
            }

            if(this.options.timeOut > 0)
            {
                this._timeouts[id] = setTimeout(() =>
                {
                    this.removeItem(itm);
                }, this.options.timeOut);
            }

            this.addItem(itm);
        });
    }

    //######################### public methods #########################

    /**
     * Adds notification item to list
     * @param  {Notification} item Item to be added
     */
    public addItem(item: Notification)
    {
        this._notifications.push(item);
    }

    /**
     * Removes notification item from list
     * @param  {number} item Item to be removed
     */
    public removeItem(item: Notification)
    {
        var index = this._notifications.indexOf(item);

        if (index > -1)
        {
            clearTimeout(this._timeouts[item.id]);
            delete this._timeouts[item.id];
            this._notifications.splice(index, 1);
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