import React, { Component } from "react";
import { AccessLevel, accessLevelTypesOptions, accessLevelTypesRadioOptions } from "../../resources/accessLevelType";
import { MethodProperty, RawMethodProperty } from "../../resources/MethodProperty";
import { FieldError } from "../Form";
import InputField from "../InputField/InputField.component";
import { SelectOption } from "../select-option/SelectOption";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { MethodPropertyValidate } from "./Validate";
import uuid from 'uuid'
import RadioButton from "../RadioButton/RadioButton";
import { arcTypesRadioOptions, ARCTypes } from "../../resources/dataStructureType";

enum MethodPropertyFormFields {
    arc = "arc",
    access = "access",
    overrides = "overrides",
    name = "name",
    type = "type",
    optional = "optional",
    lazy = "lazy",
    defaultValue = "defaultValue",
    readOnly = "readOnly",
}

enum MethodPropertyFormFieldLabels {
    arc = "Automatic Reference Count { unowned , weak }",
    access = "Access Level",
    overrides = "Overrides",
    name = "Name",
    type = "Type",
    optional = "is Optional",
    lazy = "is Lazy",
    defaultValue = "Default Value",
    readOnly = "is Read Only",
    submit = "Submit"
}

enum MethodPropertyFormFieldPlacehodlers {
    arc = "arc",
    access = "access",
    overrides = "overrides",
    name = "name",
    type = "type",
    optional = "optional",
    lazy = "lazy",
    defaultValue = "defaultValue",
    readOnly = "readOnly",
}

type MethodPropertyFormAllowedFieldValues = undefined | string | AccessLevel | boolean

interface MethodPropertyFormProps {
    property: RawMethodProperty
    onSubmit: (property: MethodProperty) => void
}

interface MethodPropertyFormState {
    property: RawMethodProperty
    errors: { [key: string]: FieldError[] }
}


/**
 *
 *
 * @export
 * @class MethodPropertyForm
 * @extends {Component<MethodPropertyFormProps, MethodPropertyFormState>}
 */
export class MethodPropertyForm extends Component<MethodPropertyFormProps, MethodPropertyFormState> {

    constructor(props: MethodPropertyFormProps, state: MethodPropertyFormState) {
        super(props, state)
        this.state = {
            property: props.property,
            errors: {}
        }

    }

    validate() {
        const { error, value } = MethodPropertyValidate(this.state.property)

        if (error === null) {
            if (value.id === undefined) {
                value.id = uuid.v4()
            }
            this.props.onSubmit(value as MethodProperty)
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
     * @param {MethodPropertyFormFields} key
     * @param {MethodPropertyFormAllowedFieldValues} [value]
     * @memberof MethodPropertyForm
     */
    valueChanged(key: MethodPropertyFormFields, value?: MethodPropertyFormAllowedFieldValues) {
        this.setState((state) => {
            switch (key) {
                case MethodPropertyFormFields.access:
                    state.property[key] = value as AccessLevel
                    break;
                case MethodPropertyFormFields.overrides:
                    const result: boolean = value === 'true' ? true : false
                    state.property[key] = result
                    break;
                case MethodPropertyFormFields.readOnly:
                    const result_readOnly: boolean = value === 'true' ? true : false
                    state.property[key] = result_readOnly
                    break;
                case MethodPropertyFormFields.arc:
                    const result_arc: ARCTypes = value as ARCTypes
                    state.property[key] = result_arc
                    break;
                case MethodPropertyFormFields.optional:
                    const result_optional: boolean = value === 'true' ? true : false
                    state.property[key] = result_optional
                    break;
                case MethodPropertyFormFields.lazy:
                    const result_lazy: boolean = value === 'true' ? true : false
                    state.property[key] = result_lazy
                default:
                    state.property[key] = (value as string | undefined)
            }
            return state
        })
    }

    /**
     * Retrieves the errors if any are present for this fields key
     *
     * @param {string} key
     * @returns {string[]}
     * @memberof MethodPropertyForm
     */
    errors(key: string): string[] {
        if (this.state.errors[key] === undefined) return []
        const _errors = this.state.errors[key]
        return _errors.map(i => {
            return i.error!
        })
    }

    getOverrides(value: boolean | undefined, equals: boolean): boolean {
        return value === undefined ? false === equals : value === equals
    }

    /**
     * 
     *
     * @returns
     * @memberof MethodPropertyForm
     */
    render() {

        const data = this.state.property

        return (
            <div className="form-section">
                <div className="form-section-navbar">
                    <h1 className="form-section-header">Property Form</h1>
                    <div className="toggleButton"></div>
                </div>
                <div className="form-section-inner">

                    <InputField
                        errors={this.errors('name')}
                        key="name"
                        onChange={(v) => this.valueChanged(MethodPropertyFormFields.name, v)}
                        label={MethodPropertyFormFieldLabels.name}
                        value={data.name || ''}
                        placeholder={MethodPropertyFormFieldPlacehodlers.name}
                        type="text" />

                    <InputField
                        errors={this.errors('type')}
                        key="type"
                        onChange={(v) => this.valueChanged(MethodPropertyFormFields.type, v)}
                        label={MethodPropertyFormFieldLabels.type}
                        value={data.type || ''}
                        placeholder={MethodPropertyFormFieldPlacehodlers.type}
                        type="text" />

                    <InputField
                        errors={this.errors('defaultValue')}
                        key="defaultValue"
                        onChange={(v) => this.valueChanged(MethodPropertyFormFields.defaultValue, v)}
                        label={MethodPropertyFormFieldLabels.defaultValue}
                        value={data.defaultValue || ''}
                        placeholder={MethodPropertyFormFieldPlacehodlers.defaultValue}
                        type="text" />

                    <RadioButton
                        title={MethodPropertyFormFieldLabels.access}
                        items={accessLevelTypesRadioOptions.map(item => {
                            item.selected = data.access === item.label
                            return item
                        })}
                        onChange={(item) => {
                            this.valueChanged(MethodPropertyFormFields.access, item.label)
                        }}
                    />

                    <RadioButton
                        title={MethodPropertyFormFieldLabels.arc}
                        items={arcTypesRadioOptions.map(item => {
                            item.selected = (data.arc === undefined ? ARCTypes.none : data.arc) === item.label
                            return item
                        })}
                        onChange={(item) => {
                            this.valueChanged(MethodPropertyFormFields.arc, item.label)
                        }}
                    />

                    <RadioButton
                        title={MethodPropertyFormFieldLabels.overrides}
                        items={[
                            { id: 'yes', label: 'true', selected: this.getOverrides(data.overrides, true) },
                            { id: 'no', label: 'false', selected: this.getOverrides(data.overrides, false) }
                        ]}
                        onChange={(item) => {
                            this.valueChanged(MethodPropertyFormFields.overrides, item.label)
                        }}

                    />

                    <RadioButton
                        title={MethodPropertyFormFieldLabels.optional}
                        items={[
                            { id: 'optional_yes', label: 'true', selected: this.getOverrides(data.optional, true) },
                            { id: 'optional_no', label: 'false', selected: this.getOverrides(data.optional, false) }
                        ]}
                        onChange={(item) => {
                            this.valueChanged(MethodPropertyFormFields.optional, item.label)
                        }}

                    />


                    <RadioButton
                        title={MethodPropertyFormFieldLabels.lazy}
                        items={[
                            { id: 'lazy_yes', label: 'true', selected: this.getOverrides(data.lazy, true) },
                            { id: 'lazy_no', label: 'false', selected: this.getOverrides(data.lazy, false) }
                        ]}
                        onChange={(item) => {
                            this.valueChanged(MethodPropertyFormFields.lazy, item.label)
                        }}

                    />

                    <RadioButton
                        title={MethodPropertyFormFieldLabels.readOnly}
                        items={[
                            { id: 'readOnly_yes', label: 'true', selected: this.getOverrides(data.readOnly, true) },
                            { id: 'readOnly_no', label: 'false', selected: this.getOverrides(data.readOnly, false) }
                        ]}
                        onChange={(item) => {
                            this.valueChanged(MethodPropertyFormFields.readOnly, item.label)
                        }}

                    />

                    <SubmitButton
                        key="submit_button"
                        title={MethodPropertyFormFieldLabels.submit}
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

