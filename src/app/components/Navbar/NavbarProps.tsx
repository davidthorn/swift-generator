import { NavbarButton } from "./NavbarButton";

/**
 *
 *
 * @export
 * @interface NavbarProps
 */
export interface NavbarProps {
  
    /**
     * Called when the back button has been pressed
     *
     * @memberof NavbarProps
     */
    onBackPress?: () => void;
    
    /**
     * Return true if the back button should be display
     * Return false for the back button to be hidden
     *
     * @memberof NavbarProps
     */
    shouldShowBackButton: () => boolean;
    
    /**
     * The right buttons are rendered from right to left
     * So the [0] button is the furthest most button
     *
     * @type {NavbarButton[]}
     * @memberof NavbarProps
     */
    rightButtons: NavbarButton[];
    
    /**
     * The text which will be used as the title which is displayed in the middle of the 
     * navigation bar
     *
     * @type {string}
     * @memberof NavbarProps
     */
    title: string;
}
