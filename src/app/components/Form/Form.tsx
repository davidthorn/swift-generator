import React, { Component } from "react"
import './Form.css'
import InputField from "../InputField/InputField.component";
import { SelectOption } from "../select-option/SelectOption";
import { dataStructureTypes, dataStructureTypesOptions, DataStructureType } from "../../resources/dataStructureType";
import { accessLevelTypes, accessLevelTypesOptions, AccessLevel } from "../../resources/accessLevelType";
import DataStructureForm from "../DataStructureForm/DataStructureForm";

interface DataStructure {
    name: string
    extends?: string
    implements?: string[]
    accessControl:AccessLevel
    type: DataStructureType
}

interface FormComponentProps {

}


interface FormComponentState {

}

export default class FormComponent extends Component<FormComponentProps, FormComponentState> {

    constructor(props: FormComponentProps , state: FormComponentState) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            
           <div className="form-group">
                <DataStructureForm></DataStructureForm>
           </div>
        )
    }

}

