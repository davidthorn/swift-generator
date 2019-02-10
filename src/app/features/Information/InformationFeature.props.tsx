import { DataStructure } from "../../resources/dataStructure";
import { MethodBlock } from "../../resources/methods";
import { MethodProperty } from "../../resources/MethodProperty";

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
    onSubmit: (structure: DataStructure, redirect: boolean) => void;

    editButtonPressed: (method: MethodBlock) => void
    deleteButtonPressed: (method: MethodBlock) => void

    editPropertyButtonPressed: (property: MethodProperty) => void
    deletePropertyButtonPressed: (property: MethodProperty) => void
}
