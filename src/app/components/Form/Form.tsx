import React, { Component } from "react";
import { DataStructure, RawDataStructure } from "../../resources/dataStructure";
import DataStructureForm from "../DataStructureForm/DataStructureForm";
import { MethodBlock } from '../../resources/methods'
import './Form.css';
import { MethodProperty } from "../../resources/MethodProperty";

/**
 *
 *
 * @interface FormComponentProps
 */
interface FormComponentProps {
    isPersisted: boolean
    editPropertyButtonPressed: (property: MethodProperty) => void
    deletePropertyButtonPressed: (property: MethodProperty) => void
    editButtonPressed: (method: MethodBlock) => void
    deleteButtonPressed: (method: MethodBlock) => void
    structure: RawDataStructure
    onSubmit: (structure: DataStructure) => void
} 

/**
 *
 *
 * @interface FormComponentState
 */
interface FormComponentState {}

/**
 *
 *
 * @export
 * @class FormComponent
 * @extends {Component<FormComponentProps, FormComponentState>}
 */
export class FormComponent extends Component<FormComponentProps, FormComponentState> {

    /**
     *Creates an instance of FormComponent.
     * @param {FormComponentProps} props
     * @param {FormComponentState} state
     * @memberof FormComponent
     */
    constructor(props: FormComponentProps , state: FormComponentState) {
        super(props, state)
        this.state = {
        }
    }

    /**
     *
     *
     * @returns
     * @memberof FormComponent
     */
    render() {
        return (
            
           <div className="form-group">
                <DataStructureForm 
                isPersisted={this.props.isPersisted}
                editPropertyButtonPressed={this.props.editPropertyButtonPressed}
                deletePropertyButtonPressed={this.props.deletePropertyButtonPressed}
                editButtonPressed={this.props.editButtonPressed}
                deleteButtonPressed={this.props.deleteButtonPressed}
                structure={this.props.structure}
                onSubmit={this.props.onSubmit}
                ></DataStructureForm>
           </div>
        )
    }

}

