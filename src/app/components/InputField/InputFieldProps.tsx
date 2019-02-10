/**
 *
 *
 * @export
 * @interface InputFieldProps
 */
export interface InputFieldProps {

    /**
     * The id attribute of the field
     *
     * @type {string}
     * @memberof InputFieldProps
     */
    id?: string;

    /**
     * The name attribute of the input field
     *
     * @type {string}
     * @memberof InputFieldProps
     */
    name?: string;

    /**
     * The text which will be displayed in the label above the field
     *
     * @type {string}
     * @memberof InputFieldProps
     */
    label: string;

    /**
     * The default value for the field
     *
     * @type {string}
     * @memberof InputFieldProps
     */
    value: string;

    /**
     * The types allowed to be used by the input field
     *
     * @type {('text' | 'email' | 'password' | 'email')}
     * @memberof InputFieldProps
     */
    type: 'text' | 'email' | 'password' | 'email';

    /**
     * The place holder text for the input field
     *
     * @type {string}
     * @memberof InputFieldProps
     */
    placeholder?: string;

    /**
     * Called every time the value of the input field changes
     *
     * @memberof InputFieldProps
     */
    onChange?: (value: string) => void;

    /**
     * The errors will be displayed above  the label in a unordered list
     * only if the there are more then 0 errors
     *
     * @type {string[]}
     * @memberof InputFieldProps
     */
    errors?: string[];
}
