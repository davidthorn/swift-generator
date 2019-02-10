import { MethodBlock } from "../../resources/methods";
import { MethodsListFeatureViews } from "./MethodsListFeatureViews";
export interface MethodsListFeatureProps {
    editButtonPressed: (method: MethodBlock) => void
    deleteButtonPressed: (method: MethodBlock) => void
    addButtonPressed: (completion: () => void) => void
    backButtonPressed: (completion: () => void) => void
    methods: MethodBlock[];
    updated: (methods: MethodBlock[]) => void;
    view: MethodsListFeatureViews
}
