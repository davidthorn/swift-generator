import React, { Component } from "react";
import { AccessLevel, accessLevelTypesOptions } from "../../resources/accessLevelType";
import { DataStructure, RawDataStructure } from "../../resources/dataStructure";
import { DataStructureType, dataStructureTypesOptions } from "../../resources/dataStructureType";
import { MethodProperty } from "../../resources/MethodProperty";
import { MethodBlock } from "../../resources/methods";
import { FieldError } from "../Form";
import InputField from "../InputField/InputField.component";
import { SelectOption } from "../select-option/SelectOption";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { DataStructureValidate } from "./Validate";

interface DataStructureFormProps {
    structure: RawDataStructure
    onSubmit: (structure: DataStructure) => void
    
}

interface DataStructureFormState {
    structure: RawDataStructure
    errors: { [key: string]: FieldError[] }
}


export default class DataStructureForm extends Component<DataStructureFormProps, DataStructureFormState> {

    constructor(props: DataStructureFormProps, state: DataStructureFormState) {
        super(props, state)
        this.state = {
            structure: props.structure,
            errors: {}
        }

    }

    validate() {

        const { error, value } = DataStructureValidate(this.state.structure)

        if (error === null) {
            this.props.onSubmit(value as DataStructure)
        } else {

            let newErrors: { [key: string]: FieldError[] } = {}

            error.details.reduce((p, q) => {

                const key = q.path[0]

                if (p[key] === undefined) {
                    p[key] = []
                }

                if (p[key].filter(i => i.type === q.type).length === 1) return p

                p[key].push({
                    error: q.message,
                    joiError: q,
                    name: key,
                    type: q.type
                })

                return p
            }, newErrors)

            this.setState({
                errors: newErrors
            })
        }

    }

    valueChanged(key: 'name' | 'accessLevel' | 'extends' | 'implements' | 'methods' | 'properties' | 'type', value?: undefined | string | AccessLevel | DataStructureType | MethodProperty[] | string[] | MethodBlock[]) {
        this.setState((state) => {
            state.structure[key] = value
            return state
        })
    }

    errors(key: string): string[] {
        if (this.state.errors[key] === undefined) return []
        const _errors = this.state.errors[key]
        return _errors.map(i => {
            return i.error!
        })
    }

    render() {

        const data = this.state.structure

        return (
            <div className="form-section">
                <div className="form-section-navbar">
                    <h1 className="form-section-header">Data Structure Form</h1>
                    <div className="toggleButton"></div>
                </div>
                <div className="form-section-inner">
                    <InputField
                        errors={this.errors('name')}
                        key="name"
                        onChange={(v) => this.valueChanged('name', v)}
                        label="Name"
                        value= {data.name || ''}
                        placeholder="Enter the data structure name"
                        type="text" />

                    <SelectOption
                        key="type"
                        options={dataStructureTypesOptions}
                        id=""
                        defaultOption=""
                        label="Type"
                        name=""
                    />

                    <SelectOption
                        options={accessLevelTypesOptions}
                        id=""
                        defaultOption=""
                        key="access_level"
                        label="Access Control"
                        name=""
                    />

                    <InputField
                        errors={this.errors('extends')}
                        onChange={(v) => this.valueChanged('extends', v)}
                        label="Extends"
                        value= {data.extends || ''}
                        key="extends"
                        placeholder="Extending"
                        type="text" />

                    <InputField
                        errors={this.errors('implements')}
                        onChange={(v) => this.valueChanged('implements', v.split(',').map(m => m.trim()))}
                        label="Implements (comma separated)"
                        value= {data.implements.join(',')}
                        key="implements"
                        placeholder="MyProtocol, OtherProtocol"
                        type="text" />

                    <SubmitButton
                        key="submit_button"
                        title="Submit"
                        onPress={() => {
                            this.validate()
                        }}
                    >

                    </SubmitButton>

                </div>
            </div>

        )
    }

}

