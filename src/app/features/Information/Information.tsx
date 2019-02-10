import React, { Component } from "react"
import DataStructureForm from "../../components/DataStructureForm/DataStructureForm";
import { InformationFeatureProps } from "./InformationFeature.props";
import { InformationFeatureState } from "./InformationFeature.state";

/** 
 * Displays a Form containing fields which are permitted to be changed
 *
 * @export
 * @class InformationFeature
 * @extends {Component<InformationFeatureProps, InformationFeatureState>}
 */
export class InformationFeature extends Component<InformationFeatureProps, InformationFeatureState> {

    /**
     *Creates an instance of InformationFeature.
     * @param {InformationFeatureProps} props
     * @param {InformationFeatureState} state
     * @memberof InformationFeature
     */
    constructor(props: InformationFeatureProps, state: InformationFeatureState) {
        super(props, state)
        this.state = {}
    }

    /**
     *
     *
     * @returns
     * @memberof InformationFeature
     */
    render() {
        return (
            <DataStructureForm
                deletePropertyButtonPressed={this.props.deletePropertyButtonPressed}
                editPropertyButtonPressed={this.props.editPropertyButtonPressed}
                deleteButtonPressed={this.props.deleteButtonPressed}
                editButtonPressed={this.props.editButtonPressed}
                structure={this.props.structure}
                onSubmit={this.props.onSubmit}
            ></DataStructureForm>
        )
    }

}

