import {Component, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, HostBinding} from '@angular/core';
import {Notification, NotificationSeverity} from '@anglr/common';
import {slideInOutTrigger} from '@anglr/animations';
import {extend} from '@jscrpt/common';

import {NotificationMessage, NotificationMessageCss, NotificationMessageOptions, NOTIFICATION_MESSAGE_OPTIONS} from '../../common/notifications.interface';

/**
 * Default options for notification message component
 * @internal
 */
const defaultOptions: NotificationMessageOptions<NotificationMessageCss> =
{
    clickToClose: true,
    maxLength: 500,
    cssClasses:
    {
        clickable: 'clickable',
        messageDiv: 'alert',
        messageTypePrefix: 'alert-'
    }
};

/**
 * Notification message component that represents simple message
 */
@Component(
 {
    selector: 'notification',
    styleUrls: ['notificationMessage.component.css'],
    templateUrl: 'notificationMessage.component.html',
    animations: [slideInOutTrigger],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationMessageComponent implements NotificationMessage<NotificationMessageCss, NotificationMessageOptions<NotificationMessageCss>>
{
    //######################### protected fields #########################

    /**
     * Item holding notification information
     */
    protected _item: Notification;

    /**
     * Represents notification options instance
     */
    protected _options: NotificationMessageOptions<NotificationMessageCss>;

    //######################### public properties - template bidings #########################

    /**
     * Object representing css class definition
     * @internal
     */
    public classObj: {[key: string]: boolean} = {};

    //######################### public properties - host #########################

    /**
     * Attach animation directly to component (enter, exit)
     * @internal
     */
    @HostBinding('@slideInOut')
    public animatedMessage = true;

    //######################### public properties #########################

    /**
     * Represents notification that will be displayed
     */
    public get item(): Notification
    {
        return this._item;
    }
    public set item(item: Notification)
    {
        this.classObj[`${this._options.cssClasses.messageTypePrefix}${NotificationSeverity[item.severity].toLowerCase()}`] = true;
        this._item = item;
    }

    /**
     * Options used for notification message
     */
    public get options(): NotificationMessageOptions<NotificationMessageCss>
    {
        return this._options;
    }
    public set options(options: NotificationMessageOptions<NotificationMessageCss>)
    {
        this._options = extend(true, this._options, options);
        this._init();
    }

    /**
     * Occurs when notification is closed by user
     */
    public closed: EventEmitter<Notification> = new EventEmitter<Notification>();

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,
                @Inject(NOTIFICATION_MESSAGE_OPTIONS) @Optional() options?: NotificationMessageOptions<NotificationMessageCss>)
    {
        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - template bidings #########################

    /**
     * Used for invoking 'closing' event
     * @internal
     */
    public close(): void
    {
        if(this.options.clickToClose)
        {
            this.closed.emit(this._item);
        }
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Initialize component from provided options
     */
    protected _init(): void
    {
        this.classObj[this.options.cssClasses.clickable] = this.options.clickToClose;
    }
}