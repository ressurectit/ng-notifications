import {Component,
        Input,
        Output,
        EventEmitter} from '@angular/core';
        
import {Notification} from './notification';
import {NotificationType} from './notification.type';

/**
 * Notification message component that represents simple message 
 */
@Component(
{
    selector: "notification",
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
    
    /**
     * Item holding notification information
     */
    private _item: Notification;
    
    /**
     * Indication whether close on click
     */
    private _clickToClose: boolean;
    
    //######################### public properties #########################
    
    /**
     * Object representing css class definition
     */
    public classObj: {[key: string]: any, clickable: boolean} = { clickable: false };
    
    //######################### public properties - inputs #########################
    
    /**
     * Notification item that should be displayed
     */
    @Input()
    public set item(item: Notification)
    {
        this.classObj[`alert-${NotificationType[item.type]}`] = true;
        this._item = item;
    }
    public get item(): Notification
    {
        return this._item;
    }
    
    /**
     * Indication that message is clickable
     */
    @Input()
    public set clickToClose(indication: boolean)
    {
        this.classObj.clickable = indication;
        this._clickToClose = indication;
    };
    
    //######################### public properties - output #########################
    
    /**
     * Occurs when notification has been closed
     */
    @Output()
    public closed: EventEmitter<Notification> = new EventEmitter();
    
    //######################### public methods #########################
    
    /**
     * Used for invoking 'closing' event
     */
    public close()
    {
        if(this._clickToClose)
        {
            this.closed.emit(this._item);
        }
    }
}