import { MethodProperty, RawMethodProperty } from "../../resources/MethodProperty";
import { PropertiesListFeatureViews } from "./PropertiesListFeatureViews";
export interface PropertiesListFeatureState {
    properties: MethodProperty[];
    view: PropertiesListFeatureViews;
    prevView: PropertiesListFeatureViews[];
    formParams?: RawMethodProperty
}
