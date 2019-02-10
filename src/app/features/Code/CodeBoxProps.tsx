import { MethodBlock } from '../../resources/methods';
import { MethodProperty } from "../../resources/MethodProperty";
import { AccessLevel } from "../../resources/accessLevelType";
import { DataStructureType } from "../../resources/dataStructureType";

/**
 *
 *
 * @export
 * @interface CodeBoxProps
 */
export interface CodeBoxProps {

    /**
     * The access level for the data structure
     *
     * @type {AccessLevel}
     * @memberof CodeBoxProps
     */
    access: AccessLevel;
    
    /**
     * The type of the data structure
     *
     * @type {DataStructureType}
     * @memberof CodeBoxProps
     */
    type: DataStructureType;
    
    /**
     * The data structures name
     *
     * @type {string}
     * @memberof CodeBoxProps
     */
    name: string;
    
    /**
     * If provided the extended data structures will be rendered after the structure name
     * seperated by a colon as per the swift synthax
     *
     * @type {string}
     * @memberof CodeBoxProps
     */
    extends?: string;
    
    /**
     * If provided the implemented data structures will be rendered after the extends
     * if an extended data structured is provided
     * If an extended structure has  not ben provided then the implemented structures
     * will appear after the colon as per swift synthax
     *
     * @type {string[]}
     * @memberof CodeBoxProps
     */
    implements?: string[];
    
    /**
     * If supplied the inti method will be rendered at the top of the data structure 
     * but below the properties and above the methods
     *
     * @type {MethodBlock}
     * @memberof CodeBoxProps
     */
    init?: MethodBlock;
    
    /**
     * If supplied the methods will be rendered at the top of the data structure 
     * but below the properties and below the init method if one is provided
     *
     * @type {MethodBlock[]}
     * @memberof CodeBoxProps
     */
    methods?: MethodBlock[];

    /**
     * If supplied the properties will be rendered at the top of the data structure
     *
     * @type {MethodProperty[]}
     * @memberof CodeBoxProps
     */
    properties?: MethodProperty[];
}
