import { DataStructure } from "../../resources/dataStructure";

/**
 *The Information features props
 *
 * @export
 * @interface InformationFeatureProps
 */
export interface InformationFeatureProps {

    /**
     * The data structure which is used
     *
     * @type {DataStructure}
     * @memberof InformationFeatureProps
     */
    structure: DataStructure;

    /**
     * Called when any of the data structures properties has changed
     *
     * @memberof InformationFeatureProps
     */
    onSubmit: (structure: DataStructure) => void;
}
