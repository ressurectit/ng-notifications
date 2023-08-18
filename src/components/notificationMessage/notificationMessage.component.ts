import {Component, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Optional, HostBinding} from '@angular/core';
import {Notification, NotificationSeverity} from '@anglr/common';
import {slideInOutTrigger} from '@anglr/animations';
import {Dictionary, extend} from '@jscrpt/common';

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
    protected ɵitem: Notification|undefined|null;

    /**
     * Represents notification options instance
     */
    protected ɵoptions: NotificationMessageOptions<NotificationMessageCss>;

    //######################### protected properties - template bidings #########################

    /**
     * Object representing css class definition
     */
    protected classObj: Dictionary<boolean> = {};

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
        return this.ɵitem ?? new Notification('', NotificationSeverity.Default);
    }
    public set item(item: Notification)
    {
        this.classObj[`${this.ɵoptions.cssClasses.messageTypePrefix}${NotificationSeverity[item.severity].toLowerCase()}`] = true;
        this.ɵitem = item;
    }

    /**
     * Options used for notification message
     */
    public get options(): NotificationMessageOptions<NotificationMessageCss>
    {
        return this.ɵoptions;
    }
    public set options(options: Partial<NotificationMessageOptions<NotificationMessageCss>>)
    {
        this.ɵoptions = extend(true, this.ɵoptions, options);
        this.init();
    }

    /**
     * Occurs when notification is closed by user
     */
    public closed: EventEmitter<Notification> = new EventEmitter<Notification>();

    //######################### constructor #########################
    constructor(protected changeDetector: ChangeDetectorRef,
                @Inject(NOTIFICATION_MESSAGE_OPTIONS) @Optional() options?: NotificationMessageOptions<NotificationMessageCss>)
    {
        this.ɵoptions = extend(true, {}, defaultOptions, options);
    }

    //######################### public methods - template bidings #########################

    /**
     * Used for invoking 'closing' event
     * @internal
     */
    public close(): void
    {
        if(this.options.clickToClose && this.ɵitem)
        {
            this.closed.emit(this.ɵitem);
        }
    }

    //######################### public methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this.changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Initialize component from provided options
     */
    protected init(): void
    {
        if(this.options.cssClasses.clickable)
        {
            this.classObj[this.options.cssClasses.clickable] = this.options.clickToClose;
        }
    }
}