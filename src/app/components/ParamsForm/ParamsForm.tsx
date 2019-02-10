import React, { Component } from "react";
import { AccessLevel, accessLevelTypesOptions } from "../../resources/accessLevelType";
import { Params, RawParams } from "../../resources/methods";
import { FieldError } from "../Form";
import InputField from "../InputField/InputField.component";
import { SelectOption } from "../select-option/SelectOption";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { ParamsValidate } from "./Validate";
import uuid from 'uuid'

enum ParamsFormFields {
    name = "name",
    value = "value",
    label = "label",
    optional = "optional",
}

enum ParamsFormFieldLabels {
    name = "name",
    value = "value",
    label = "label",
    optional = "optional",
    submit = "submit"
}

enum ParamsFormFieldPlacehodlers {
    name = "name",
    value = "value",
    label = "label",
    optional = "optional",
}

type ParamsFormAllowedFieldValues = undefined | string | boolean

interface ParamsFormProps {
    params: RawParams
    onSubmit: (property: Params) => void
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
        console.log('received params' , props.params)
        this.state = {
            params: props.params,
            errors: {}
        }

    }

    validate() {

        console.log('params for state' , this.state.params)

        const { error, value } = ParamsValidate(this.state.params)

        if (error === null) {
            if (value.id === undefined) {
                value.id = uuid.v4()
            }
            
            this.props.onSubmit(value as Params)
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
                    <h1 className="form-section-header">Property Form</h1>
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
                        errors={this.errors('value')}
                        key="value"
                        onChange={(v) => this.valueChanged(ParamsFormFields.value, v)}
                        label={ParamsFormFieldLabels.value}
                        value={data.value || ''}
                        placeholder={ParamsFormFieldPlacehodlers.value}
                        type="text" />
                  
                    <SelectOption
                        options={[
                            { id: 'optional_yes', name: 'Yes' },
                            { id: 'optional_no', name: 'No' }
                        ]}
                        id=""
                        onChange={(v) => this.valueChanged(ParamsFormFields.optional, v)}
                        defaultOption=""
                        key="optional"
                        label={ParamsFormFieldLabels.optional}
                        name="optional"
                    />

                    <SubmitButton
                        key="submit_button"
                        title={ParamsFormFieldLabels.submit}
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

