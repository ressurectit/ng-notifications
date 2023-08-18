import {ComponentRef, Directive, Input, OnChanges, SimpleChanges, ViewContainerRef, EventEmitter, Output, OnDestroy, Inject, Optional, Type} from '@angular/core';
import {Notification} from '@anglr/common';
import {nameof} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {NotificationMessage, NotificationsOptions, NOTIFICATION_MESSAGE_SERVICE, NotificationMessageService} from '../../common/notifications.interface';

/**
* Creates instance of component dynamically by its metadata
*/
@Directive(
{
    selector: '[messageRenderer]',
    exportAs: 'messageRenderer'
})
export class MessageRendererDirective implements OnChanges, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Created component reference
     */
    protected componentRef: ComponentRef<NotificationMessage>|null = null;

    /**
     * Subscription for listening on closed message
     */
    protected closedSubscription: Subscription|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Instance of notification message that should be rendered
     */
    @Input({alias: 'messageRenderer', required: true})
    public notification!: Notification;

    /**
     * Options passed to notifications component
     */
    @Input({required: true})
    public notificationsOptions!: NotificationsOptions;

    //######################### public properties - outputs #########################

    /**
     * Occurs when message was closed by user
     */
    @Output()
    public closed: EventEmitter<Notification> = new EventEmitter<Notification>();

    //######################### protected properties #########################

    /**
     * Instance of dynamically created component
     */
    protected get component(): NotificationMessage|null
    {
        if(!this.componentRef)
        {
            return null;
        }

        return this.componentRef.instance;
    }

    //######################### constructor #########################
    constructor(protected viewContainerRef: ViewContainerRef,
                @Inject(NOTIFICATION_MESSAGE_SERVICE) @Optional() protected notificationMessageService?: NotificationMessageService)
    {
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        this.viewContainerRef.clear();

        if(nameof<MessageRendererDirective>('notification') in changes && changes[nameof<MessageRendererDirective>('notification')].currentValue)
        {
            const injector = this.viewContainerRef.injector;
            let notificationMessageType: Type<NotificationMessage>;

            if(this.notificationMessageService)
            {
                notificationMessageType = this.notificationMessageService.getNotificationMessageComponent(this.notification.severity);
            }
            else
            {
                notificationMessageType = this.notificationsOptions.getNotificationMessageComponent(this.notification.severity);
            }

            this.componentRef = this.viewContainerRef.createComponent(notificationMessageType, 
                                                                      {
                                                                          injector,
                                                                      });

            this.ngOnDestroy();

            this.closedSubscription = this.component?.closed.subscribe(this.closedEmit);

            if(this.component)
            {
                this.component.item = this.notification;
                this.component.options = this.notificationsOptions.messageOptions ?? {};
                this.component.invalidateVisuals();
            }
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.closedSubscription?.unsubscribe();
        this.closedSubscription = null;
    }

    //######################### protected methods #########################

    /**
     * Called when notification was closed by user
     * @param notification - Notification that was closed
     */
    protected closedEmit = (notification: Notification): void =>
    {
        this.closed.emit(notification);
    }
}
