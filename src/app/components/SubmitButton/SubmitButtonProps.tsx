import { SubmitButton } from "./SubmitButton";
/**
 *
 *
 * @export
 * @interface SubmitButtonProps
 */
export interface SubmitButtonProps {
    
    size?: 'normal' | 'small' | 'medium'

    type?: 'normal' | 'danger' | 'none'
    
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
