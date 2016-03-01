import {Component,
        EventEmitter} from 'angular2/core';
import {Notification} from './notification';
import {NotificationType} from './notification.type';

/**
 * Notification message component that represents simple message 
 */
@Component(
{
    selector: "notification",
    inputs: ['item', 'clickToClose'],
    outputs: ['closing'],
    styles: 
    [`
        .clickable
        {
            cursor: pointer;
        }
    `],
    template: 
   `<div class="alert"
         (click)="close()"
         [ngClass]="classObj">
        {{item?.message}}
    </div>`
})
export class NotificationMessage
{
    //######################### private fields #########################
    private _item: Notification;
    
    //######################### public properties - inputs #########################
    
    /**
     * Object representing css class definition
     */
    public classObj = { clickable: false };
    
    /**
     * Notification item that should be displayed
     */
    public set item(item: Notification)
    {
        this.classObj[`alert-${NotificationType[item.type]}`] = true;
        this._item = item;
    };
    public get item(): Notification
    {
        return this._item;
    }
    
    /**
     * Indication that message is clickable
     */
    public set clickToClose(indication: boolean)
    {
        this.classObj.clickable = indication;
    };
    
    //######################### public properties - output #########################
    
    /**
     * Occurs when user is explicitly trying to close
     */
    public closing: EventEmitter<Notification> = new EventEmitter();
    
    //######################### public methods #########################
    
    /**
     * Used for invoking 'closing' event
     */
    public close()
    {
        this.closing.emit(this._item);
    }
}