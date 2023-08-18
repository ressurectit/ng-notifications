import {Attribute, Directive, FactoryProvider, inject} from '@angular/core';
import {generateId} from '@jscrpt/common';

import {LOCAL_NOTIFICATIONS, LocalNotificationsService} from '../../common/notifications.service';

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
                
                if(self.name)
                {
                    return LOCAL_NOTIFICATIONS.named(self.name);
                }

                return LOCAL_NOTIFICATIONS.named(generateId(6));
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