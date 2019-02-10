import React, { Component } from "react";
import { AccessLevel, accessLevelTypesOptions } from "../../resources/accessLevelType";
import { MethodProperty, RawMethodProperty } from "../../resources/MethodProperty";
import { FieldError } from "../Form";
import InputField from "../InputField/InputField.component";
import { SelectOption } from "../select-option/SelectOption";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { MethodPropertyValidate } from "./Validate";
import uuid from 'uuid'

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
        console.log('submitted method', this.state.property)
        const { error, value } = MethodPropertyValidate(this.state.property)

        if (error === null) {
            if (value.id === undefined) {
                value.id = uuid.v4()
            }
            console.log('no errors')
            this.props.onSubmit(value as MethodProperty)
        } else {
            console.log('no errors', error)
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
        console.log('value', {
            key: key,
            value
        })
        this.setState((state) => {
            switch (key) {
                case MethodPropertyFormFields.access:
                    state.property[key] = (value as string).split('_')[1] as AccessLevel
                    break;
                case MethodPropertyFormFields.overrides:
                    const result: boolean = (value as string).split('_')[1] === 'yes' ? true : false
                    state.property[key] = result
                    break;
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
                        value={data.name || ''}
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

                    <SelectOption
                        options={[
                            { id: 'arc_none' , name: 'none' },
                            { id: 'arc_unowned' , name: 'unowned' },
                            { id: 'arc_weak' , name: 'weak' }
                        ]}
                        id=""
                        onChange={(v) => this.valueChanged(MethodPropertyFormFields.arc, v)}
                        defaultOption=""
                        key="arc"
                        label={MethodPropertyFormFieldLabels.arc}
                        name="arc"
                    />

                    <SelectOption
                        options={accessLevelTypesOptions}
                        id=""
                        onChange={(v) => this.valueChanged(MethodPropertyFormFields.access, v)}
                        defaultOption=""
                        key="access"
                        label={MethodPropertyFormFieldLabels.access}
                        name="access"
                    />

                    <SelectOption
                        options={[
                            { id: 'overrides_yes', name: 'Yes' },
                            { id: 'overrides_no', name: 'No' }
                        ]}
                        id=""
                        onChange={(v) => this.valueChanged(MethodPropertyFormFields.overrides, v)}
                        defaultOption=""
                        key="overrides"
                        label={MethodPropertyFormFieldLabels.overrides}
                        name=""
                    />

                    <SelectOption
                        options={[
                            { id: 'optional_yes', name: 'Yes' },
                            { id: 'optional_no', name: 'No' }
                        ]}
                        id=""
                        onChange={(v) => this.valueChanged(MethodPropertyFormFields.optional, v)}
                        defaultOption=""
                        key="optional"
                        label={MethodPropertyFormFieldLabels.optional}
                        name="optional"
                    />

                    <SelectOption
                        options={[
                            { id: 'lazy_yes', name: 'Yes' },
                            { id: 'lazy_no', name: 'No' }
                        ]}
                        id=""
                        onChange={(v) => this.valueChanged(MethodPropertyFormFields.lazy, v)}
                        defaultOption=""
                        key="lazy"
                        label={MethodPropertyFormFieldLabels.lazy}
                        name="lazy"
                    />

                    <SelectOption
                        options={[
                            { id: 'readOnly_yes', name: 'Yes' },
                            { id: 'readOnly_no', name: 'No' }
                        ]}
                        id="readOnly"
                        onChange={(v) => this.valueChanged(MethodPropertyFormFields.readOnly, v)}
                        defaultOption=""
                        key="readOnly"
                        label={MethodPropertyFormFieldLabels.readOnly}
                        name="readOnly"
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

