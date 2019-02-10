import { MethodBlock } from "./methods";
import { MethodProperty } from "./MethodProperty";
import { AccessLevel } from "./accessLevelType";
import { DataStructureType } from "./dataStructureType";

export interface DataStructure {
    name: string
    type: DataStructureType
    accessLevel: AccessLevel
    methods: MethodBlock[]
    properties: MethodProperty[]
    extends?: string
    implements: string[]

}

export interface RawDataStructure {
    name?: string
    type: DataStructureType
    accessLevel: AccessLevel
    methods: MethodBlock[]
    properties: MethodProperty[]
    extends?: string
    implements: string[]

}