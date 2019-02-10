import { SubmitButton } from "./SubmitButton";
/**
 *
 *
 * @export
 * @interface SubmitButtonProps
 */
export interface SubmitButtonProps {
    
    /**
     *
     *
     * @type {string}
     * @memberof SubmitButtonProps
     */
    title: string;

    /**
     *
     *
     * @memberof SubmitButtonProps
     */
    onPress: (button: SubmitButton) => void;
}
