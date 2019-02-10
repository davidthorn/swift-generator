import { Params } from "../../resources/methods";
import { ParamsListFeatureViews } from "./ParamsListFeatureViews";
export interface ParamsListFeatureProps {
    editButtonPressed: (params: Params) => void
    deleteButtonPressed: (params: Params) => void
    addButtonPressed: (completion: () => void) => void
    backButtonPressed: (completion: () => void) => void
    params: Params[];
    updated: (params: Params[]) => void;
    view: ParamsListFeatureViews
}
