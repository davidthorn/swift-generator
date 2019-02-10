import React, { Component } from "react";
import { DataStructure, RawDataStructure } from "../../resources/dataStructure";
import DataStructureForm from "../DataStructureForm/DataStructureForm";
import './Form.css';

interface FormComponentProps {
    structure: RawDataStructure
    onSubmit: (structure: DataStructure) => void
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
                <DataStructureForm 
                structure={this.props.structure}
                onSubmit={this.props.onSubmit}
                ></DataStructureForm>
           </div>
        )
    }

}

