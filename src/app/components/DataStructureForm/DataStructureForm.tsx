import React, { Component } from "react";
import { MethodsListFeature } from "../../features/Methods/MethodsList.feature";
import { MethodsListFeatureViews } from "../../features/Methods/MethodsListFeatureViews";
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
import '../Form/Form.css'
import { MethodBlockForm } from "../MethodForm/MethodForm";

enum DataStructureFormFields {
    name = 'name',
    accessLevel = 'accessLevel',
    extends = 'extends',
    implements = 'implements',
    methods = 'methods',
    properties = 'properties',
    type = 'type'
}

enum DataStructureFieldLabels {
    name = 'Name',
    accessLevel = 'Access Level',
    extends = 'Extends',
    implements = 'Implements (comma separated)',
    methods = 'Methods',
    properties = 'Properties',
    type = 'Type',
    submit = 'Submit'
}

enum DataStructureFieldPlaceholder {
    name = 'Enter a structure name',
    accessLevel = 'Choose an access level',
    extends = 'Enter an Extendable structure name',
    implements = 'Enters a comma separated list of data structures',
    type = 'Choose a type'
}

type DataStructureFormAllowedFieldValues = undefined | string | AccessLevel | DataStructureType | MethodProperty[] | string[] | MethodBlock[]

interface DataStructureFormProps {
    editButtonPressed: (method: MethodBlock) => void
    deleteButtonPressed: (method: MethodBlock) => void
    structure: RawDataStructure
    onSubmit: (structure: DataStructure, redirect: boolean) => void
}

interface DataStructureFormState {
    structure: RawDataStructure
    errors: { [key: string]: FieldError[] }
    formActive: boolean,
    methodParams?: MethodBlock
}


export default class DataStructureForm extends Component<DataStructureFormProps, DataStructureFormState> {

    constructor(props: DataStructureFormProps, state: DataStructureFormState) {
        super(props, state)
        this.state = {
            structure: props.structure,
            errors: {},
            formActive: false
        }

    }

    validate() {

        const { error, value } = DataStructureValidate(this.state.structure)

        if (error === null) {
            this.props.onSubmit(value as DataStructure , true)
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
    valueChanged(key: DataStructureFormFields, value?: DataStructureFormAllowedFieldValues) {
        this.setState((state) => {
            switch (key) {
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

    protected formElements(formActive: boolean): JSX.Element | undefined {

        if (formActive) return undefined

        const data = this.state.structure
        return (
            <React.Fragment>
                <InputField
                    errors={this.errors('name')}
                    key="name"
                    onChange={(v) => this.valueChanged(DataStructureFormFields.name, v)}
                    label={DataStructureFieldLabels.name}
                    value={data.name || ''}
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
                    value={data.extends || ''}
                    key="extends"
                    placeholder={DataStructureFieldPlaceholder.extends}
                    type="text" />

                <InputField
                    errors={this.errors('implements')}
                    onChange={(v) => this.valueChanged(DataStructureFormFields.implements, v.split(',').map(m => m.trim()))}
                    label={DataStructureFieldLabels.implements}
                    value={data.implements.join(',')}
                    key="implements"
                    placeholder={DataStructureFieldPlaceholder.implements}
                    type="text" />
            </React.Fragment>

        )
    }

    protected formButton(formActive: boolean): JSX.Element | undefined {
        if (formActive) return undefined
        return (
            <SubmitButton
                key="submit_button"
                title={DataStructureFieldLabels.submit}
                onPress={() => {
                    this.validate()
                }}
            />
        )
    }

    protected methodsList(formActive: boolean, method?: MethodBlock): JSX.Element {

        if(method !== undefined) {
            return (
                <MethodBlockForm
                method={method}
                onSubmit={(updatedMethod) => {
                    this.setState((state) => {
                        const struct =  state.structure
                        struct.methods = struct.methods.map(i => i.id === updatedMethod.id ? updatedMethod : i)
                        return {
                            ...state,
                            structure: struct,
                            methodParams: undefined,
                            formActive: false
                        }
                    }, () => {
                        this.props.onSubmit(this.state.structure as DataStructure, false)
                    })
                }}
                />
            )
        } 

        return (
            <MethodsListFeature
                deleteButtonPressed={this.props.deleteButtonPressed}
                editButtonPressed={(method) => {
                    console.log('edit button pressed')
                    this.setState((state) => {
                        return {
                            ...state,
                            methodParams: method,
                            formActive: true
                        }
                    })
                }}
                view={formActive === true ? MethodsListFeatureViews.form : MethodsListFeatureViews.list}
                backButtonPressed={() => {
                    this.setState(() => {
                        return {
                            formActive: false
                        }
                    })
                }}
                addButtonPressed={(completion) => {
                    console.log('add button pressed')
                    this.setState(() => {
                        return {
                            formActive: true
                        }
                    }, completion)

                }}
                methods={this.state.structure.methods}
                updated={(methods) => {
                    this.setState((state) => {
                        state.structure.methods = methods
                        return {
                            ...state,
                            formActive: false,
                            methodParams: undefined,
                            structure: state.structure
                        }
                    }, () => {
                        this.props.onSubmit(this.state.structure as DataStructure , false)
                    })
                }}
            />
        )
    }

    /**
     * 
     *
     * @returns
     * @memberof DataStructureForm
     */
    render() {

        return (
            <div className="form-section">
                <div className="form-section-navbar">
                    <div className="form-section-header">
                        <span>Data Structure Form</span>
                    </div>
                    <div className="toggleButton"></div>
                </div>
                <div className="form-section-inner">
                    {this.formElements(this.state.formActive)}
                    {this.methodsList(this.state.formActive, this.state.methodParams)}
                    {this.formButton(this.state.formActive)}
                </div>
            </div>

        )
    }

}

