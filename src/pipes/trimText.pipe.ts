import {Pipe, PipeTransform} from '@angular/core';
import {isBlank} from '@jscrpt/common';

/**
 * Trims provided text by provided length
 */
@Pipe({name: 'trimText'})
export class TrimTextPipe implements PipeTransform
{
    /**
     * Trims provided text by provided length
     * @param value - Text to be trimmed
     * @param length - Maximal allowed text length
     */
    public transform(value: string, length: number): string 
    {
        if(isBlank(value) || isBlank(length) || value?.length < length)
        {
            return value;
        }

        return value.substring(0, length) + ' ...';
    }
}