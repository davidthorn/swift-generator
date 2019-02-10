import { MethodBlock } from "../../resources/methods";
export interface MethodsListFeatureProps {
    methods: MethodBlock[];
    updated: (methods: MethodBlock[]) => void;
}
