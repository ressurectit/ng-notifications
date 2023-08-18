import {Directive, Input, OnChanges, SimpleChanges} from '@angular/core';
import {nameof} from '@jscrpt/common';

import {NotificationsComponent} from '../../components/notifications/notifications.component';
import {NotificationMessageOptions} from '../../common/notifications.interface';

/**
 * Directive used for providing message options directly to notifications
 */
@Directive(
{
    selector: 'notifications[messageOptions]'
})
export class MessageOptionsNotificationsDirective implements OnChanges
{
    //######################### public properties - inputs #########################

    /**
     * Message options passed to message instance
     */
    @Input({required: true})
    public messageOptions!: NotificationMessageOptions;

    //######################### constructor #########################
    constructor(protected _notifications: NotificationsComponent)
    {
    }
    
    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<MessageOptionsNotificationsDirective>('messageOptions') in changes && this.messageOptions)
        {
            this._notifications.options =
            {
                messageOptions: this.messageOptions
            };
        }
    }
}