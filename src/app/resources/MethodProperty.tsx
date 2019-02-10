export interface MethodProperty {
    arc?: 'unowned' | 'weak';
    access: 'public' | 'private' | 'internal' | 'fileprivate';
    overrides?: boolean;
    name: string;
    type: string;
    optional?: boolean;
    lazy?: boolean;
    defaultValue?: string;
    readOnly?: boolean;
}
