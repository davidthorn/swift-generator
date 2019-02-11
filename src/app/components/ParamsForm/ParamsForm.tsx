import React, { Component } from "react";
import uuid from 'uuid';
import { Params, RawParams } from "../../resources/methods";
import { FieldError } from "../Form";
import InputField from "../InputField/InputField.component";
import RadioButton from "../RadioButton/RadioButton";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { ParamsValidate } from "./Validate";

enum ParamsFormFields {
    name = "name",
    type = "type",
    label = "label",
    optional = "optional",
    defaultValue = "defaultValue"
}

enum ParamsFormFieldLabels {
    name = "Name",
    type = "Type",
    label = "Label",
    optional = "is Optional",
    submit = "Submit",
    defaultValue = "Default Value"
}

enum ParamsFormFieldPlacehodlers {
    name = "The name of the parameter",
    type = "The type of the parameter",
    label = "The label for the parameter",
    optional = "is Optional",
    defaultValue = "Default Value"
}

type ParamsFormAllowedFieldValues = undefined | string | boolean

interface ParamsFormProps {
    params: RawParams
    onSubmit: (params: Params) => void
}

interface ParamsFormState {
    params: RawParams
    errors: { [key: string]: FieldError[] }
}


/**
 *
 *
 * @export
 * @class ParamsForm
 * @extends {Component<ParamsFormProps, ParamsFormState>}
 */
export class ParamsForm extends Component<ParamsFormProps, ParamsFormState> {

    constructor(props: ParamsFormProps, state: ParamsFormState) {
        super(props, state)
        this.state = {
            params: props.params,
            errors: {}
        }

    }

    validate() {

        const { error, value } = ParamsValidate(this.state.params)

        if (error === null) {
            if (value.id === undefined) {
                value.id = uuid.v4()
            }
            this.props.onSubmit(value as Params)
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
     * @param {ParamsFormFields} key
     * @param {ParamsFormAllowedFieldValues} [value]
     * @memberof ParamsForm
     */
    valueChanged(key: ParamsFormFields, value?: ParamsFormAllowedFieldValues) {
        this.setState((state) => {
            switch (key) {
                case ParamsFormFields.optional:
                    const result_optional: boolean = (value as string).split('_')[1] === 'yes' ? true : false
                    state.params[key] = result_optional
                    break;
                default:
                    state.params[key] = (value as string | undefined)
            }

            return state
        })
    }

    /**
     * Retrieves the errors if any are present for this fields key
     *
     * @param {string} key
     * @returns {string[]}
     * @memberof ParamsForm
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
     * @memberof ParamsForm
     */
    render() {

        const data = this.state.params

        return (
            <div className="form-section">
                <div className="form-section-navbar">
                    <h1 className="form-section-header">Method Parameters Form</h1>
                    <div className="toggleButton"></div>
                </div>
                <div className="form-section-inner">

                    <InputField
                        errors={this.errors('name')}
                        key="name"
                        onChange={(v) => this.valueChanged(ParamsFormFields.name, v)}
                        label={ParamsFormFieldLabels.name}
                        value={data.name || ''}
                        placeholder={ParamsFormFieldPlacehodlers.name}
                        type="text" />


                    <InputField
                        errors={this.errors('label')}
                        key="label"
                        onChange={(v) => this.valueChanged(ParamsFormFields.label, v)}
                        label={ParamsFormFieldLabels.label}
                        value={data.label || ''}
                        placeholder={ParamsFormFieldPlacehodlers.label}
                        type="text" />

                    <InputField
                        errors={this.errors('type')}
                        key="type"
                        onChange={(v) => this.valueChanged(ParamsFormFields.type, v)}
                        label={ParamsFormFieldLabels.type}
                        value={data.type || ''}
                        placeholder={ParamsFormFieldPlacehodlers.type}
                        type="text" />
                    
                    <InputField
                        errors={this.errors('defaultValue')}
                        key="defaultValue"
                        onChange={(v) => this.valueChanged(ParamsFormFields.defaultValue, v)}
                        label={ParamsFormFieldLabels.defaultValue}
                        value={data.defaultValue || ''}
                        placeholder={ParamsFormFieldPlacehodlers.defaultValue}
                        type="text" />
                  
                  <RadioButton
                        title={ParamsFormFieldLabels.optional}
                        items={[
                            { id: 'optional_yes', label: 'true', selected: this.getOverrides(data.optional, true) },
                            { id: 'optional_no', label: 'false', selected: this.getOverrides(data.optional, false) }
                        ]}
                        onChange={(item) => {
                            this.valueChanged(ParamsFormFields.optional, item.label)
                        }}
                    />

                    <SubmitButton
                        key="submit_button"
                        title="Save Params Form"
                        onPress={this.validate.bind(this)}
                    >

                    </SubmitButton>

                </div>
            </div>

        )
    }

}

