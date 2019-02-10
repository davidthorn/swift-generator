import { MethodBlock } from "./methods";
import { MethodProperty } from "./MethodProperty";
import { AccessLevel } from "./accessLevelType";
import { DataStructureType } from "./dataStructureType";

export interface DataStructure {

    /**
     * The name given to the data structure
     * It must only be alphanumeric, must not contain spaces
     *
     * @type {string}
     * @memberof DataStructure
     */
    name: string

    /**
     * By default the type will be set to `class`
     *
     * @type {DataStructureType}
     * @memberof DataStructure
     */
    type: DataStructureType

    /**
     * By default set to `internal`
     *
     * @type {AccessLevel}
     * @memberof DataStructure
     */
    accessLevel: AccessLevel

    /**
     * By default is an empty array
     *
     * @type {MethodBlock[]}
     * @memberof DataStructure
     */
    methods: MethodBlock[]

    /**
     * By default is set to an empty array
     *
     * @type {MethodProperty[]}
     * @memberof DataStructure
     */
    properties: MethodProperty[]

    /**
     * If set will naturally always be the first type declared after the :
     *
     * @type {string}
     * @memberof DataStructure
     */
    extends?: string

    /**
     * By default is set to an empty array
     *
     * @type {string[]}
     * @memberof DataStructure
     */
    implements: string[]

}

/**
 * Complies to the DataStructure but allows for the user defined properties to be undefined
 * The form will use this type and will output a DataStructure once the RawDataStructure has been 
 * validated to be a DataStructure
 *
 * @export
 * @interface RawDataStructure
 */
export interface RawDataStructure {
    name?: string
    type: DataStructureType
    accessLevel: AccessLevel
    methods: MethodBlock[]
    properties: MethodProperty[]
    extends?: string
    implements: string[]
}