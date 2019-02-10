import { MethodProperty } from "../../resources/MethodProperty";
import { PropertiesListFeatureViews } from "./PropertiesListFeatureViews";
export interface PropertiesListFeatureProps {
    editButtonPressed: (property: MethodProperty) => void
    deleteButtonPressed: (property: MethodProperty) => void
    addButtonPressed: (completion: () => void) => void
    backButtonPressed: (completion: () => void) => void
    properties: MethodProperty[];
    updated: (properties: MethodProperty[]) => void;
    view: PropertiesListFeatureViews
}
