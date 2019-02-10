/**
 *
 *
 * @export
 * @interface NavbarButton
 */
export interface NavbarButton {

    /**
     * The id should be used to indicate which button has been pressed
     * in the navigation bar
     *
     * @type {string}
     * @memberof NavbarButton
     */
    id: string;

    /**
     * Called when the button in the navigation bar has been pressed
     *
     * @memberof NavbarButton
     */
    onPress: (button: NavbarButton) => void;
}
