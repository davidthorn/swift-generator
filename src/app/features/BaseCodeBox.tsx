import React, { Component, memo } from "react"

interface MethodProperty {
    arc?: 'unowned' | 'weak'
    access: 'public' | 'private' | 'internal' | 'fileprivate' 
    overrides?: boolean
    name: string
    type: string
    optional?: boolean
    lazy?: boolean
    defaultValue?: string
    readOnly?: boolean
}

interface MethodBlock {
    access: 'public' | 'private' | 'internal' | 'fileprivate' 
    params: Params[]
    name: string | 'init'
    returnType?: string
    overrides?: boolean
}

interface Params {
    name?: string
    label: string
    value: string
    optional: boolean 
}

interface CodeBoxProps {
    access: 'public' | 'private' | 'internal' | 'fileprivate' | undefined
    type: 'class' | 'enum' | 'struct' | 'protocol'
    name: string
    extends?: string
    implements?: string[] 
    init?: MethodBlock
    methods?: MethodBlock[]
    properties?: MethodProperty[]
}

class BaseCodeBox extends Component<CodeBoxProps> {

    constructor(props: CodeBoxProps) {
        super(props)
        this.state = {
        }
    }

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

    toParam( param: Params , index: number , array: Params[] ): string {
            const name = param.name === undefined ?  '' : `${param.name} `
            return `${name}${param.label}: ${this.toOptional(param.value, param.optional)}`
    }

    asCalledParams(param: Params , index: number , array: Params[] ): string {
        const label = param.name === undefined ?  `${param.label}: ${param.label}` : param.name === '_' ? `${param.label}` : `${param.name}:${param.label}`
        return `${label}`
    }

    toOptional(value: String , isOptional?: boolean): string {
        return `${value}${isOptional !== undefined ? isOptional === true ? '?' : '' : ''}`
    }

    toReturnType(value?: string  ): string {
        return value === undefined ? ' -> Void' : ` -> ${value}`
    }

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

    toAccess(value?: 'public' | 'internal' | 'private' | 'fileprivate' | 'open'): string {
        return value !== undefined ? `${value} ` : ''
    }

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

    getMethods(): string {
        let methods: string[] = []
        if(this.props.methods === undefined) return ''
        methods = this.props.methods.map(this.toMethod , this)
        return methods.join('\n\n')
    }

    getProperties(): string {
        let properties: string[] = []
        if(this.props.properties === undefined) return ''
        properties = this.props.properties.map(this.toProperty , this)
        return properties.join('\n\n')
    }

    getExtends(): string {
        const extended: string = this.props.extends === undefined ? '' : `: ${this.props.extends}`
        let data: string[] = [extended]
        if(this.props.implements !== undefined) {
            data = data.concat(this.props.implements)
        }
        return data.join(',')
    }

    render() {
        return (<div></div>)
    }

}

export { BaseCodeBox }
