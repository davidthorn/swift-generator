export interface Params {
    name?: string
    label: string
    value: string
    optional: boolean 
}

export interface MethodBlock {
    access: 'public' | 'private' | 'internal' | 'fileprivate' 
    params: Params[]
    name: string | 'init'
    returnType?: string
    overrides?: boolean
}

