import {Attribute, Directive, FactoryProvider, inject} from '@angular/core';
import {NOTIFICATIONS} from '@anglr/common';

import {LOCAL_NOTIFICATIONS_SCOPE_NAME, LocalNotificationsService} from '../../common/notifications.service';

/**
 * Directive used for providing local notifications service to local notifications
 */
@Directive(
{
    selector: 'notifications[withProvider]',
    providers:
    [
        <FactoryProvider>
        {
            provide: LocalNotificationsService,
            useFactory: () =>
            {
                const self = inject(LocalNotificationsProviderDirective, {self: true});
                const notifications = inject(NOTIFICATIONS);
                
                if(self.name)
                {
                    return notifications.getScope(`${LOCAL_NOTIFICATIONS_SCOPE_NAME}-${self.name}`);
                }

                return notifications.getScope(LOCAL_NOTIFICATIONS_SCOPE_NAME);
            },
        },
    ]
})
export class LocalNotificationsProviderDirective
{
    //######################### public properties #########################

    /**
     * Name of scope, if not specified non scoped will be used
     */
    public name: string|undefined|null;

    //######################### constructor #########################
    constructor(@Attribute('withProvider') name: string)
    {
        if(name)
        {
            this.name = name;
        }
    }
}