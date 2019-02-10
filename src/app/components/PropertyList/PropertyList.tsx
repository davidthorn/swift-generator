import React, { Component } from "react"
import { MethodProperty } from "../../resources/MethodProperty";
import './PropertyList.css'
import '../MethodsList/MethodsList.css'
import { SubmitButton } from "../SubmitButton/SubmitButton";

interface PropertyListProps {
    properties: MethodProperty[]
    editButtonPressed: (property: MethodProperty) => void
    deleteButtonPressed: (property: MethodProperty) => void
}

interface PropertyListState { 
    properties: MethodProperty[]
}

export default class PropertyList extends Component<PropertyListProps, PropertyListState> {

    constructor(props: PropertyListProps, state: PropertyListState) {
        super(props, state)
        this.state = {
            properties: props.properties
        }
    }

    deleteProperty(property: MethodProperty) {
        const _save_properties = this.state.properties.filter(i => i.id !== property.id)
        this.setState({
            properties: _save_properties
        }, () => {
            this.props.deleteButtonPressed(property)
        })
    }

    editProperty(property: MethodProperty) {
        this.props.editButtonPressed(property)
    }

    render() {

        let items = this.state.properties.map((property,index) => {
            const mod = index % 2 === 0 ? 'row-light' : 'row-dark'
            const classes = `property-list-table-row ${mod}`
            return (
                <div key={property.id} className={classes}>
                    <div className="col-name">
                        { property.name }
                    </div>
                    <div className="col-edit-button">
                        <SubmitButton title="Edit" onPress={() => { 
                            this.editProperty(property)
                        }} />
                    </div>
                    <div className="col-delete-button">
                        <SubmitButton title="Delete" onPress={() => { 
                            this.deleteProperty(property)
                        }} />
                    </div>
                </div>
            )
        })

        return (
            <div className="property-list-table">
                <div className="property-list-table-header">
                    <div className="header-name">
                        Property Name
                    </div>
                    <div className="col-edit-button"></div>
                    <div className="col-delete-button"></div>
                </div>

                { items }

            </div>

        )
    }

}

