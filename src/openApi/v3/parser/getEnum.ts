import type { Enum } from '../../../client/interfaces/Enum';
import { isDefined } from '../../../utils/isDefined';

//
export const getEnum = (values?: (string | number)[]): Enum[] => {
    if (Array.isArray(values)) {
        return values
            .filter((value, index, arr) => {
                return arr.indexOf(value) === index;
            })
            .filter(isDefined)
            .map(value => {
                if (typeof value === 'number') {
                    return {
                        name: `'_${value}'`,
                        value: String(value),
                        type: 'number',
                        description: null,
                    };
                }
                const name = String(value)
                    .replace(/'/g, '')
                    .replace(/-/g, '_')
                    .replace(/^(\d+)/g, '_$1')
                    .replace(/([a-z])([A-Z]+)/g, '$1_$2')
                    .toUpperCase();
                return {
                    name: name.match(/\W+/g) ? `'${name}'` : name,
                    value: `'${value.replace(/'/g, "\\'")}'`,
                    type: 'string',
                    description: null,
                };
            });
    }
    return [];
};
