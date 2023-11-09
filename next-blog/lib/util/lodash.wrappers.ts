import lodashGet from 'lodash.get';

/**
 * Lodash get() wrapper
 * @param (Object) object
 * @param (Array|string) path
 * @param (*) defaultValue
 */
export const _get = (object:any, path:string, defaultValue:any) => {
    return lodashGet(object, path, defaultValue);
};