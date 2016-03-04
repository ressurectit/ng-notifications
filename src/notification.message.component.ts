import {Component,
        ElementRef,
        EventEmitter} from 'angular2/core';
import {Notification} from './notification';
import {NotificationType} from './notification.type';
import TimelineMax from 'timelinemax';

/**
 * Notification message component that represents simple message 
 */
@Component(
{
    selector: "notification",
    inputs: ['item', 'clickToClose', 'animated', 'visible'],
    outputs: ['closing', 'closed'],
    styles: 
    [`
        .clickable
        {
            cursor: pointer;
        }
        .invisible
        {
            opacity: 0;
        }
        .collapsed
        {
            border: 0 none;
            font-size: 0;
            margin: 0;
            padding: 0;
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
    public classObj = { clickable: false, collapsed: true, invisible: true };
    
    //######################### public properties - inputs #########################
    
    /**
     * Indication whether notification is visible 
     */
    public set visible(visible: boolean)
    {
        if(this.animated)
        {
            var div = this._element.nativeElement.children[0];
            
            //Animated show
            if(visible)
            {
                var timeline = new TimelineMax();

                timeline.to(div, 0.3, {className: "-=collapsed"})
                    .to(div, 0.4, {className: "-=invisible"});
            }
            //animated hide
            else
            {
                var timeline = new TimelineMax({onComplete: () => this._removeSelf()});

                timeline.to(div, 0.4, {opacity: 0})
                    .to(div, 0.3, {padding: 0, margin: 0, fontSize: 0, borderWidth: 0});
            }
            
            return;
        }
        else
        {
            this.classObj.collapsed = !visible;
            this.classObj.invisible = !visible;
        }
        
        if(!visible)
        {
            this._removeSelf();
        }
    }
    
    /**
     * Indication whether displayed notification should be animated
     */
    public animated: boolean;
    
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
        this._clickToClose = indication;
    };
    
    //######################### public properties - output #########################
    
    /**
     * Occurs when notification is closing
     */
    public closing: EventEmitter<Notification> = new EventEmitter();
    
    /**
     * Occurs when notification has been closed
     */
    public closed: EventEmitter<Notification> = new EventEmitter();
    
    //######################### constructor #########################
    constructor(private _element: ElementRef)
    {
    }
    
    //######################### public methods #########################
    
    /**
     * Used for invoking 'closing' event
     */
    public close()
    {
        if(this._clickToClose)
        {
            this.closing.emit(this._item);
        }
    }
    
    //######################### private methods #########################
    
    /**
     * Used for invocation of 'closed' event and removing itself from notifications
     */
    private _removeSelf()
    {
        this.closed.emit(this._item);
    }
}