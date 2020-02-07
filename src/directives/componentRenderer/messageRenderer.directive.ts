import {ComponentRef, Directive, Input, OnChanges, SimpleChanges, ViewContainerRef, EventEmitter, Output, ComponentFactoryResolver, OnDestroy, Inject, Optional, Type} from '@angular/core';
import {nameof} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {NotificationMessage, NotificationMessageOptions, NotificationsOptions, NOTIFICATION_MESSAGE_SERVICE, NotificationMessageService} from '../../common/notifications.interface';
import {Notification} from '../../common/notification';

/**
* Creates dynamically instance of component by its metadata
*/
@Directive(
{
    selector: '[messageRenderer]',
    exportAs: 'messageRenderer'
})
export class MessageRendererDirective implements OnChanges, OnDestroy
{
    //######################### private fields #########################

    /**
     * Created component reference
     */
    private _componentRef: ComponentRef<NotificationMessage<any, NotificationMessageOptions<any>>>|null = null;

    /**
     * Subscription for listening on closed message
     */
    private _closedSubscription: Subscription;

    //######################### public properties - inputs #########################

    /**
     * Instance of notification message that should be rendered
     */
    @Input('messageRenderer')
    public notification: Notification;

    /**
     * Options passed to notifications options
     */
    @Input()
    public notificationsOptions: NotificationsOptions<any, NotificationMessageOptions<any>>;

    //######################### public properties - outputs #########################

    /**
     * Occurs when message was closed by user
     */
    @Output()
    public closed: EventEmitter<Notification> = new EventEmitter<Notification>();

    //######################### private properties #########################

    /**
     * Instance of dynamically created component
     */
    private get component(): NotificationMessage<any, NotificationMessageOptions<any>>|null
    {
        if(!this._componentRef)
        {
            return null;
        }

        return this._componentRef.instance;
    }

    //######################### constructor #########################
    constructor(private _viewContainerRef: ViewContainerRef,
                @Inject(NOTIFICATION_MESSAGE_SERVICE) @Optional() private _notificationMessageService?: NotificationMessageService<any, NotificationMessageOptions<any>>)
    {
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges)
    {
        this._viewContainerRef.clear();

        if(nameof<MessageRendererDirective>('notification') in changes && changes[nameof<MessageRendererDirective>('notification')].currentValue)
        {
            let injector = this._viewContainerRef.parentInjector;
            let notificationMessageType: Type<NotificationMessage<any, NotificationMessageOptions<any>>>;

            if(this._notificationMessageService)
            {
                notificationMessageType = this._notificationMessageService.getNotificationMessageComponent(this.notification.type);
            }
            else
            {
                notificationMessageType = this.notificationsOptions.getNotificationMessageComponent(this.notification.type);
            }

            const componentFactoryResolver: ComponentFactoryResolver = injector.get(ComponentFactoryResolver);
            const componentFactory = componentFactoryResolver.resolveComponentFactory(notificationMessageType);
            this._componentRef = this._viewContainerRef.createComponent(componentFactory, this._viewContainerRef.length, injector);

            this.ngOnDestroy();

            this._closedSubscription = this.component.closed.subscribe(this._closedEmit);
            this.component.item = this.notification;
            this.component.options = this.notificationsOptions.messageOptions || {};
            this.component.invalidateVisuals();
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._closedSubscription)
        {
            this._closedSubscription.unsubscribe();
            this._closedSubscription = null;
        }
    }

    //######################### private methods #########################

    /**
     * Called when notification was closed by user
     * @param notification - Notification that was closed
     */
    private _closedEmit = (notification: Notification) =>
    {
        this.closed.emit(notification);
    }
}
