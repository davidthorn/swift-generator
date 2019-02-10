import { Params, RawParams } from "../../resources/methods";
import { ParamsListFeatureViews } from "./ParamsListFeatureViews";
export interface ParamsListFeatureState {
    params: Params[];
    view: ParamsListFeatureViews;
    prevView: ParamsListFeatureViews[];
    formParams?: RawParams
}
