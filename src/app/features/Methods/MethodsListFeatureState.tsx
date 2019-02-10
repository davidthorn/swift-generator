import { MethodBlock } from "../../resources/methods";
import { MethodsListFeatureViews } from "./MethodsListFeatureViews";
export interface MethodsListFeatureState {
    methods: MethodBlock[];
    view: MethodsListFeatureViews;
    prevView: MethodsListFeatureViews[];
}
