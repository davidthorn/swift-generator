import { MethodBlock } from "../../resources/methods";
import { MethodsListFeatureViews } from "./MethodsListFeatureViews";
export interface MethodsListFeatureProps {
    addButtonPressed: (completion: () => void) => void
    backButtonPressed: (completion: () => void) => void
    methods: MethodBlock[];
    updated: (methods: MethodBlock[]) => void;
    view: MethodsListFeatureViews
}
