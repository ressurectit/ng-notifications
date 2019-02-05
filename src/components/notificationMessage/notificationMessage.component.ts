import {Component, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional} from '@angular/core';
import {extend} from '@jscrpt/common';

import {Notification, NotificationType, NotificationMessage, NotificationMessageCss, NotificationMessageOptions, NOTIFICATION_MESSAGE_OPTIONS} from '../../common';

/**
 * Default options for notification message component
 * @internal
 */
const defaultOptions: NotificationMessageOptions<NotificationMessageCss> =
{
    clickToClose: true,
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
    selector: "notification",
    styles:
    [`
        .clickable
        {
            cursor: pointer;
        }
    `],
    templateUrl: 'notificationMessage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationMessageComponent implements NotificationMessage<NotificationMessageCss, NotificationMessageOptions<NotificationMessageCss>>
{
    //######################### private fields #########################

    /**
     * Item holding notification information
     */
    private _item: Notification;

    /**
     * Represents notification options instance
     */
    private _options: NotificationMessageOptions<NotificationMessageCss>;

    //######################### public properties - template bidings #########################

    /**
     * Object representing css class definition
     * @internal
     */
    public classObj: {[key: string]: any} = {};

    //######################### public properties #########################

    /**
     * Represents notification that will be displayed
     */
    public set item(item: Notification)
    {
        this.classObj[`${this._options.cssClasses.messageTypePrefix}${NotificationType[item.type]}`] = true;
        this._item = item;
    }
    public get item(): Notification
    {
        return this._item;
    }

    /**
     * Options used for notification message
     */
    public set options(options: NotificationMessageOptions<NotificationMessageCss>)
    {
        this._options = extend(true, this._options, options);
        this._init();
    }
    public get options(): NotificationMessageOptions<NotificationMessageCss>
    {
        return this._options;
    }

    /**
     * Occurs when notification is closed by user
     */
    public closed: EventEmitter<Notification> = new EventEmitter<Notification>();

    //######################### constructor #########################
    constructor(private _changeDetector: ChangeDetectorRef,
                @Inject(NOTIFICATION_MESSAGE_OPTIONS) @Optional() options?: NotificationMessageOptions<NotificationMessageCss>)
    {
        this._options = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - template bidings #########################

    /**
     * Used for invoking 'closing' event
     * @internal
     */
    public close()
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

    //######################### private methods #########################

    /**
     * Initialize component from provided options
     */
    private _init()
    {
        this.classObj[this.options.cssClasses.clickable] = this.options.clickToClose;
    }
}