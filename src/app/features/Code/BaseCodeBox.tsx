import React, { Component } from "react"
import { Params, MethodBlock } from '../../resources/methods'
import { MethodProperty } from "../../resources/MethodProperty";
import { CodeBoxProps } from "./CodeBoxProps";

/**
 *
 *
 * @class BaseCodeBox
 * @extends {Component<CodeBoxProps>}
 */
class BaseCodeBox extends Component<CodeBoxProps> {

    /**
     *Creates an instance of BaseCodeBox.
     * @param {CodeBoxProps} props
     * @memberof BaseCodeBox
     */
    constructor(props: CodeBoxProps) {
        super(props)
        this.state = {
        }
    }

    /**
     *
     *
     * @returns {string}
     * @memberof BaseCodeBox
     */
    getInit(): string {
        if(this.props.init === undefined) return ''
        const { access , params, overrides } = this.props.init
        let method = this.toMethod({
            name: 'init',
            access,
            params,
            overrides
        })
        return method
    }

    /**
     *
     *
     * @param {Params} param
     * @param {number} index
     * @param {Params[]} array
     * @returns {string}
     * @memberof BaseCodeBox
     */
    toParam( param: Params , index: number , array: Params[] ): string {
            const name = param.name === undefined ?  '' : `${param.name} `
            return `${name}${param.label}: ${this.toOptional(param.value, param.optional)}`
    }

    /**
     *
     *
     * @param {Params} param
     * @param {number} index
     * @param {Params[]} array
     * @returns {string}
     * @memberof BaseCodeBox
     */
    asCalledParams(param: Params , index: number , array: Params[] ): string {
        const label = param.name === undefined ?  `${param.label}: ${param.label}` : param.name === '_' ? `${param.label}` : `${param.name}:${param.label}`
        return `${label}`
    }

    /**
     *
     *
     * @param {String} value
     * @param {boolean} [isOptional]
     * @returns {string}
     * @memberof BaseCodeBox
     */
    toOptional(value: String , isOptional?: boolean): string {
        return `${value}${isOptional !== undefined ? isOptional === true ? '?' : '' : ''}`
    }

    /**
     *
     *
     * @param {string} [value]
     * @returns {string}
     * @memberof BaseCodeBox
     */
    toReturnType(value?: string  ): string {
        return value === undefined ? ' -> Void' : ` -> ${value}`
    }

    /**
     *
     *
     * @param {MethodBlock} method
     * @param {boolean} asSuper
     * @returns {string}
     * @memberof BaseCodeBox
     */
    callMethod(method: MethodBlock, asSuper: boolean): string {
        let t: string[] = method.params.map(this.asCalledParams, this)
        
        if(method.name === undefined) {
            throw new Error('Method name must be provided')
        }
        const name = method.name

        const access = `${asSuper ? 'super' : 'self'}.${name}`
        const returnText = method.returnType === undefined ? '' : method.returnType !== 'Void' ? 'return ' : ''
        return `${returnText}${access}(${t.join(', ')})`
    }

    /**
     *
     *
     * @param {('public' | 'internal' | 'private' | 'fileprivate' | 'open')} [value]
     * @returns {string}
     * @memberof BaseCodeBox
     */
    toAccess(value?: 'public' | 'internal' | 'private' | 'fileprivate' | 'open'): string {
        return value !== undefined ? `${value} ` : ''
    }

    /**
     *
     *
     * @param {MethodBlock} method
     * @returns {string}
     * @memberof BaseCodeBox
     */
    toMethod(method: MethodBlock ): string {
        let t: string[] = method.params.map(this.toParam.bind(this))
        
        if(method.name === undefined) {
            throw new Error('Method name must be provided')
        }
        const name = method.name

        const func = name === 'init' ? '' : 'func ' 
        const overrides = method.overrides === undefined ? '' : method.overrides === true ? `override ` : ''
        const access = `${this.toAccess(method.access)}${overrides}${func}${name}`
        const callSuper = method.overrides !== undefined && method.overrides === true ? this.callMethod(method , method.overrides || false) : 'fatalError("${name} Not yet implemented")'
 
        return `${access}(${t.join(', ')})${name !== 'init' ? this.toReturnType(method.returnType) : ''} {
        ${callSuper}
    }`
    }

    /**
     *
     *
     * @param {MethodProperty} property
     * @returns {string}
     * @memberof BaseCodeBox
     */
    toProperty(property: MethodProperty ): string {
      
        if(property.name === undefined) {
            throw new Error('Method name must be provided')
        }
        const { name , type , optional , overrides, defaultValue, arc , readOnly } = property

        const isOptional = optional === undefined ? false : optional
        const overridesText = property.overrides === undefined ? '' : property.overrides === true ? `override ` : ''

        const typeText =  `${type}${isOptional ? '' : '?'}`

        const defaultValueStringified = type === 'String' ? `"${defaultValue}"` : defaultValue
        const defaultValueText = defaultValue === undefined ? '' : ` = ${defaultValueStringified}`

        const arcText = arc === undefined ? '' : `${arc} ` 

        const variableType = readOnly === undefined ? 'var ' : 'let '

        const access = `${this.toAccess(property.access)}${arcText}${overridesText}${variableType}${name}: ${typeText}${defaultValueText}`
        return access
    }

    /**
     *
     *
     * @returns {string}
     * @memberof BaseCodeBox
     */
    getMethods(): string {
        let methods: string[] = []
        if(this.props.methods === undefined) return ''
        methods = this.props.methods.map(this.toMethod , this)
        return methods.join('\n\n')
    }

    /**
     *
     *
     * @returns {string}
     * @memberof BaseCodeBox
     */
    getProperties(): string {
        let properties: string[] = []
        if(this.props.properties === undefined) return ''
        properties = this.props.properties.map(this.toProperty , this)
        return properties.join('\n\n')
    }

    /**
     *
     *
     * @returns {string}
     * @memberof BaseCodeBox
     */
    getExtends(): string {
        let data: string[] = []
        if(this.props.extends !== undefined && this.props.extends.length > 0) {
            data.push(this.props.extends)
        }
        
        if(this.props.implements !== undefined) {
            data = data.concat(this.props.implements)
        }

        if(data.length === 0) return ''

        return `: ${data.join(', ')}`
    }

    /**
     *
     *
     * @returns
     * @memberof BaseCodeBox
     */
    render() {
        return (<div></div>)
    }

}

export { BaseCodeBox }
