import React, { Component } from "react";
import { AccessLevel, accessLevelTypesOptions } from "../../resources/accessLevelType";
import { MethodBlock, RawMethodBlock, Params } from "../../resources/methods";
import { MethodProperty } from "../../resources/MethodProperty";
import { FieldError } from "../Form";
import InputField from "../InputField/InputField.component";
import { SelectOption } from "../select-option/SelectOption";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { MethodBlockValidate } from "./Validate";
import uuid from 'uuid'

enum MethodBlockFormFields {
    name = 'name',
    accessLevel = 'access',
    overrides = 'overrides',
    params = 'params',
    returnType = "returnType"
}

enum MethodBlockFieldLabels {
    name = 'Name',
    accessLevel = 'Access Level',
    overrides = 'Overrides',
    params = 'Params',
    returnType = "Return Type",
    submit = 'Submit'
}

enum MethodBlockFieldPlaceholder {
    name = 'Enter a method name',
    accessLevel = 'Choose an access level',
    overrides = 'Does this method override',
    params = 'Params',
    returnType = "Return Type",
}

type MethodBlockFormAllowedFieldValues = undefined | string | AccessLevel | boolean | Params[]

interface MethodBlockFormProps {
    method: RawMethodBlock
    onSubmit: (method: MethodBlock) => void
}

interface MethodBlockFormState {
    method: RawMethodBlock
    errors: { [key: string]: FieldError[] }
}


/**
 *
 *
 * @export
 * @class MethodBlockForm
 * @extends {Component<MethodBlockFormProps, MethodBlockFormState>}
 */
export class MethodBlockForm extends Component<MethodBlockFormProps, MethodBlockFormState> {

    constructor(props: MethodBlockFormProps, state: MethodBlockFormState) {
        super(props, state)
        this.state = {
            method: props.method,
            errors: {}
        }

    }

    validate() {
        console.log('submitted method', this.state.method)
        const { error, value } = MethodBlockValidate(this.state.method)

        if (error === null) {
            if (value.id === undefined) {
                value.id = uuid.v4()
            }
            console.log('no errors')
            this.props.onSubmit(value as MethodBlock)
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
     * @param {MethodBlockFormFields} key
     * @param {MethodBlockFormAllowedFieldValues} [value]
     * @memberof MethodBlockForm
     */
    valueChanged(key: MethodBlockFormFields, value?: MethodBlockFormAllowedFieldValues) {
        console.log('value' , {
            key: key,
            value
        })
        this.setState((state) => {
            switch (key) {
                case MethodBlockFormFields.accessLevel:
                    state.method[key] = (value as string).split('_')[1] as AccessLevel
                    break;
                case MethodBlockFormFields.overrides:
                    const result: boolean = (value as string).split('_')[1] === 'yes' ? true : false
                    state.method[key] = result
                    break;
                case MethodBlockFormFields.params:
                    state.method[key] = (value as Params[])
                    break;
                default:
                    state.method[key] = (value as string | undefined)
            }

            return state
        })
    }

    /**
     * Retrieves the errors if any are present for this fields key
     *
     * @param {string} key
     * @returns {string[]}
     * @memberof MethodBlockForm
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
     * @memberof MethodBlockForm
     */
    render() {

        const data = this.state.method

        return (
            <div className="form-section">
                <div className="form-section-navbar">
                    <h1 className="form-section-header">Method Form</h1>
                    <div className="toggleButton"></div>
                </div>
                <div className="form-section-inner">
                    <InputField
                        errors={this.errors('name')}
                        key="name"
                        onChange={(v) => this.valueChanged(MethodBlockFormFields.name, v)}
                        label={MethodBlockFieldLabels.name}
                        value={data.name || ''}
                        placeholder={MethodBlockFieldPlaceholder.name}
                        type="text" />

                    <SelectOption
                        options={accessLevelTypesOptions}
                        id=""
                        onChange={(v) => this.valueChanged(MethodBlockFormFields.accessLevel, v)}
                        defaultOption=""
                        key="accessLevel"
                        label={MethodBlockFieldLabels.accessLevel}
                        name="accessLevel"
                    />

                    <SelectOption
                        options={[
                            { id: 'overrides_yes', name: 'Yes' },
                            { id: 'overrides_no', name: 'No' }
                        ]}
                        id=""
                        onChange={(v) => this.valueChanged(MethodBlockFormFields.overrides, v)}
                        defaultOption=""
                        key="overrides"
                        label={MethodBlockFieldLabels.overrides}
                        name=""
                    />


                    <InputField
                        errors={this.errors('returnType')}
                        key="returnType"
                        onChange={(v) => this.valueChanged(MethodBlockFormFields.returnType, v)}
                        label={MethodBlockFieldLabels.returnType}
                        value={data.returnType || 'Void'}
                        placeholder={MethodBlockFieldPlaceholder.returnType}
                        type="text" />

                    <SubmitButton
                        key="submit_button"
                        title={MethodBlockFieldLabels.submit}
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

