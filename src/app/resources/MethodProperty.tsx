import { AccessLevel } from "./accessLevelType";

export interface MethodProperty {
    id: string
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

export interface RawMethodProperty {
    id?: string
    arc?: 'unowned' | 'weak';
    access: AccessLevel
    overrides?: boolean;
    name?: string;
    type?: string;
    optional?: boolean;
    lazy?: boolean;
    defaultValue?: string;
    readOnly?: boolean;
}
