import React, { Component } from "react"
import DataStructureForm from "../../components/DataStructureForm/DataStructureForm";
import { DataStructure } from "../../resources/dataStructure";


interface InformationFeatureProps {
    structure: DataStructure,
    onSubmit: (structure: DataStructure) => void
}

interface InformationFeatureState {

}

export default class InformationFeature extends Component<InformationFeatureProps, InformationFeatureState> {

    constructor(props: InformationFeatureProps , state: InformationFeatureState) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            <DataStructureForm
            structure={this.props.structure}
            onSubmit={this.props.onSubmit}
            ></DataStructureForm>
        )
    }

}

