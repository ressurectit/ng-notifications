import {NgModule} from '@angular/core';

import {NotificationMessageComponent} from '../../components';
import {MessageRendererDirective} from '../../directives';

/**
 * Module for core notifications components, directives, pipes
 */
@NgModule(
{
    imports:
    [
        NotificationMessageComponent,
        MessageRendererDirective,
    ],
    exports:
    [
        NotificationMessageComponent,
        MessageRendererDirective,
    ],
})
export class NotificationsCoreModule
{
}
