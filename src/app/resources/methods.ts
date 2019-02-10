import { AccessLevel } from "./accessLevelType";

export interface Params {
    
    /**
     * swifts argumentLabel
     * ref: https://docs.swift.org/swift-book/LanguageGuide/Functions.html
     *
     * @type {string}
     * @memberof Params
     */
    name?: string 

    /**
     * swifts parameterName
     * ref: https://docs.swift.org/swift-book/LanguageGuide/Functions.html
     *
     * @type {string}
     * @memberof Params
     */
    label: string

    /**
     * The value can be either the type of the param or the value
     * If will be used as the value if the method is being called
     *
     * @type {string}
     * @memberof Params
     */
    value: string
    optional: boolean 
}

export interface MethodBlock {
    access: AccessLevel
    params: Params[]
    name: string | 'init'
    returnType?: string
    overrides?: boolean
}

