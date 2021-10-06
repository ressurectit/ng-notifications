import {Directive} from '@angular/core';

import {LOCAL_NOTIFICATIONS} from '../../common/notifications.service';

/**
 * Directive used for providing local notifications service to local notifications
 */
@Directive(
{
    selector: 'notifications[withProvider]',
    providers:
    [
        LOCAL_NOTIFICATIONS.named(null)
    ]
})
export class LocalNotificationsProviderDirective
{
}