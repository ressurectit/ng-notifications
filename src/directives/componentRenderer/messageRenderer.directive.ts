import {ComponentRef, Directive, Input, OnChanges, SimpleChanges, ViewContainerRef, EventEmitter, Output, ComponentFactoryResolver, OnDestroy, Inject, Optional, Type} from '@angular/core';
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
    protected _componentRef: ComponentRef<NotificationMessage>|null = null;

    /**
     * Subscription for listening on closed message
     */
    protected _closedSubscription: Subscription;

    //######################### public properties - inputs #########################

    /**
     * Instance of notification message that should be rendered
     */
    @Input('messageRenderer')
    public notification: Notification;

    /**
     * Options passed to notifications component
     */
    @Input()
    public notificationsOptions: NotificationsOptions;

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
        if(!this._componentRef)
        {
            return null;
        }

        return this._componentRef.instance;
    }

    //######################### constructor #########################
    constructor(protected _viewContainerRef: ViewContainerRef,
                @Inject(NOTIFICATION_MESSAGE_SERVICE) @Optional() protected _notificationMessageService?: NotificationMessageService)
    {
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        this._viewContainerRef.clear();

        if(nameof<MessageRendererDirective>('notification') in changes && changes[nameof<MessageRendererDirective>('notification')].currentValue)
        {
            const injector = this._viewContainerRef.injector;
            let notificationMessageType: Type<NotificationMessage>;

            if(this._notificationMessageService)
            {
                notificationMessageType = this._notificationMessageService.getNotificationMessageComponent(this.notification.severity);
            }
            else
            {
                notificationMessageType = this.notificationsOptions.getNotificationMessageComponent(this.notification.severity);
            }

            const componentFactoryResolver: ComponentFactoryResolver = injector.get(ComponentFactoryResolver);
            const componentFactory = componentFactoryResolver.resolveComponentFactory(notificationMessageType);
            this._componentRef = this._viewContainerRef.createComponent(componentFactory, this._viewContainerRef.length, injector);

            this.ngOnDestroy();

            this._closedSubscription = this.component.closed.subscribe(this._closedEmit);
            this.component.item = this.notification;
            this.component.options = this.notificationsOptions.messageOptions ?? {};
            this.component.invalidateVisuals();
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._closedSubscription?.unsubscribe();
        this._closedSubscription = null;
    }

    //######################### protected methods #########################

    /**
     * Called when notification was closed by user
     * @param notification - Notification that was closed
     */
    protected _closedEmit = (notification: Notification): void =>
    {
        this.closed.emit(notification);
    }
}
