import { SelectOptionItem } from "./SelectOptionItem";

/**
 *
 *
 * @export
 * @interface SelectOptionProps
 */
export interface SelectOptionProps {

    /**
     * The text which will be displayed in the label
     *
     * @type {string}
     * @memberof SelectOptionProps
     */
    label: string;

    /**
    * The html name attribute which will be set on the select option
     *
     * @type {string}
     * @memberof SelectOptionProps
     */
    name: string;

    /**
     * The html id attribute which will be set on the select option
     *
     * @type {string}
     * @memberof SelectOptionProps
     */
    id: string;

    /**
     * The default option which will be displayed
     * 
     * @type {string}
     * @memberof SelectOptionProps
     */
    defaultOption: string;

    /**
     * Called everytime the value of the select option has changed
     *
     * @memberof SelectOptionProps
     */
    onChange?: (value: string) => void;

    /**
     * The options which should be displayed
     *
     * @type {SelectOptionItem[]}
     * @memberof SelectOptionProps
     */
    options: SelectOptionItem[];
}
