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

enum DataStructureFormFields {
    name = 'name' ,
    accessLevel = 'accessLevel',
    extends = 'extends',
    implements = 'implements',
    methods = 'methods',
    properties = 'properties',
    type= 'type'
}

enum DataStructureFieldLabels {
    name = 'Name' ,
    accessLevel = 'Access Level',
    extends = 'Extends',
    implements = 'Implements (comma separated)',
    methods = 'Methods',
    properties = 'Properties',
    type= 'Type',
    submit = 'Submit'
}

enum DataStructureFieldPlaceholder {
    name = 'Enter a structure name' ,
    accessLevel = 'Choose an access level',
    extends = 'Enter an Extendable structure name',
    implements = 'Enters a comma separated list of data structures',
    type= 'Choose a type'
}

type  DataStructureFormAllowedFieldValues = undefined | string | AccessLevel | DataStructureType | MethodProperty[] | string[] | MethodBlock[]

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

    /**
     * Called everytime a fields value in the form has changed
     * This method is responsible for the updating of the states structure property
     *
     * @param {DataStructureFormFields} key
     * @param {DataStructureFormAllowedFieldValues} [value]
     * @memberof DataStructureForm
     */
    valueChanged(key:  DataStructureFormFields , value?: DataStructureFormAllowedFieldValues) {
        this.setState((state) => {
            switch(key) {
                case DataStructureFormFields.type:
                    state.structure[key] = (value as string).split('_')[1] as DataStructureType
                break
                case DataStructureFormFields.accessLevel:
                    state.structure[key] = (value as string).split('_')[1] as AccessLevel
                break;
                case DataStructureFormFields.extends:
                    const extends_value = (value as string).trim()
                    state.structure[key] = extends_value.length > 0 ? extends_value : undefined 
                    break
                default:
                    state.structure[key] = value
            }
            
            return state
        })
    }

    /**
     * Retrieves the errors if any are present for this fields key
     *
     * @param {string} key
     * @returns {string[]}
     * @memberof DataStructureForm
     */
    errors(key: string): string[] {
        if (this.state.errors[key] === undefined) return []
        const _errors = this.state.errors[key]
        return _errors.map(i => {
            return i.error!
        })
    }

    /**
     * 
     *
     * @returns
     * @memberof DataStructureForm
     */
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
                        onChange={(v) => this.valueChanged(DataStructureFormFields.name, v)}
                        label={DataStructureFieldLabels.name}
                        value= {data.name || ''}
                        placeholder={DataStructureFieldPlaceholder.name}
                        type="text" />

                    <SelectOption
                        key="type"
                        options={dataStructureTypesOptions}
                        id=""
                        onChange={(v) => this.valueChanged(DataStructureFormFields.type, v)}
                        defaultOption=""
                        label={DataStructureFieldLabels.type}
                        name=""
                    />

                    <SelectOption
                        options={accessLevelTypesOptions}
                        id=""
                        onChange={(v) => this.valueChanged(DataStructureFormFields.accessLevel, v)}
                        defaultOption=""
                        key="accessLevel"
                        label={DataStructureFieldLabels.accessLevel}
                        name=""
                    />

                    <InputField
                        errors={this.errors('extends')}
                        onChange={(v) => this.valueChanged(DataStructureFormFields.extends, v)}
                        label={DataStructureFieldLabels.extends}
                        value= {data.extends || ''}
                        key="extends"
                        placeholder={DataStructureFieldPlaceholder.extends}
                        type="text" />

                    <InputField
                        errors={this.errors('implements')}
                        onChange={(v) => this.valueChanged(DataStructureFormFields.implements, v.split(',').map(m => m.trim()))}
                        label={DataStructureFieldLabels.implements}
                        value= {data.implements.join(',')}
                        key="implements"
                        placeholder={DataStructureFieldPlaceholder.implements}
                        type="text" />

                    <SubmitButton
                        key="submit_button"
                        title={DataStructureFieldLabels.submit}
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

