import {Component,
        OnDestroy,
        Input,
        Optional} from '@angular/core';
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
    template:
   `<div [class]="cssClass">
        <notification *ngFor="let itm of notifications"
                      [item]="itm"
                      [visible]="itm.visible"
                      [clickToClose]="options.clickToClose"
                      [animated]="options.animations"
                      (closing)="closeItem($event)"
                      (closed)="removeItem($event)">
        </notification>
    </div>`
})
export class Notifications implements OnDestroy
{
    //######################### private fields #########################

    /**
     * Array of active timeouts
     */
    private _timeouts: {[index: number]: any} = {};

    /**
     * Array of displayed notifications - working set
     */
    private _activeNotifications: Notification[] = [];

    /**
     * Subscription for clearing event
     */
    private _clearingSubscription: Subscription = null;

    //######################### public properties #########################

    /**
     * Array of displayed notifications - displayed set
     */
    private notifications: Notification[] = [];

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

        this.options = options || new NotificationsOptions(10000, true, 500, true);

        //removing all displayed items
        this._clearingSubscription = service.clearingMessages.subscribe(() =>
        {
            this._activeNotifications.forEach(notification =>
            {
                this.closeItem(notification);
            });
        });

        service.notifying.subscribe((itm: Notification) =>
        {
            var id = 0;

            if(this._activeNotifications.length > 0)
            {
                id = this._activeNotifications[this._activeNotifications.length - 1].id + 1;
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
                    delete this._timeouts[id];
                    this.closeItem(itm);
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
        this._activeNotifications.push(item);
        this.notifications.push(item);
        item.visible = true;
    }

    /**
     * Closes notification item
     * @param  {number} item Item to be closed
     */
    public closeItem(item: Notification)
    {
        var index = this._activeNotifications.indexOf(item);

        if (index > -1)
        {
            delete this._timeouts[item.id];
            this._activeNotifications.splice(index, 1);
            item.visible = false;
        }
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
    }
}