import React, { Component } from "react";
import { AccessLevel, accessLevelTypesOptions } from "../../resources/accessLevelType";
import { MethodBlock, RawMethodBlock, Params, RawParams } from "../../resources/methods";
import { MethodProperty } from "../../resources/MethodProperty";
import { FieldError } from "../Form";
import InputField from "../InputField/InputField.component";
import { SelectOption } from "../select-option/SelectOption";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { MethodBlockValidate } from "./Validate";
import uuid from 'uuid'
import { ParamsForm } from "../ParamsForm/ParamsForm";
import { ParamsListFeature } from "../../features/Params/ParamsList.feature";
import { ParamsListFeatureViews } from "../../features/Params/ParamsListFeatureViews";

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
    onSubmit: (method: MethodBlock, redirect: boolean) => void
}

interface MethodBlockFormState {
    method: RawMethodBlock
    errors: { [key: string]: FieldError[] }
    paramsFormActive: boolean
    paramsData?: RawParams
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
            errors: {},
            paramsFormActive: false,
            paramsData: undefined

        }

    }

    validate() {
        const { error, value } = MethodBlockValidate(this.state.method)

        if (error === null) {
            if (value.id === undefined) {
                value.id = uuid.v4()
            }
            this.props.onSubmit(value as MethodBlock , false)
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
     * @param {MethodBlockFormFields} key
     * @param {MethodBlockFormAllowedFieldValues} [value]
     * @memberof MethodBlockForm
     */
    valueChanged(key: MethodBlockFormFields, value?: MethodBlockFormAllowedFieldValues) {
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

    protected paramsList(paramsFormActive: boolean, paramsData?: RawParams): JSX.Element {

        if (paramsData !== undefined) {
            return (
                <ParamsForm
                    params={paramsData}
                    onSubmit={(updatedParams) => {
                        this.setState((state) => {
                            const method = state.method
                            method.params = method.params.map(i => i.id === updatedParams.id ? updatedParams : i)
                            return {
                                ...state,
                                method: method,
                                propertyParams: undefined,
                                propertyFormActive: false
                            }
                        }, () => {
                            this.props.onSubmit(this.state.method as MethodBlock , false)
                        })
                    }}
                />
            )
        }

        return (

            <ParamsListFeature
                deleteButtonPressed={(params) => {
                    const method = this.state.method
                    const new_params = method.params.filter(i => { return i.id !== params.id })
                    method.params = new_params
                    this.setState((state) => {
                       
                        return {
                            ...state,
                            paramsFormActive: false,
                            paramsData: undefined,
                            method: method
                        }
                    }, () => {
                        this.props.onSubmit(this.state.method as MethodBlock, false)
                    })
                }}
                editButtonPressed={(params) => {
                    this.setState((state) => {
                        return {
                            ...state,
                            paramsData: params as RawParams,
                            paramsFormActive: true,
                        }
                    })
                }}
                view={paramsFormActive === true ? ParamsListFeatureViews.form : ParamsListFeatureViews.list}
                backButtonPressed={() => {
                    this.setState(() => {
                        return {
                            paramsFormActive: false
                        }
                    })
                }}
                addButtonPressed={(completion) => {
                    console.log('add button pressed')
                    this.setState((state) => {
                        return {
                            paramsFormActive: true
                        }
                    },completion)

                }}
                params={this.state.method.params}
                updated={(updatedParams) => {
                       this.setState((state) => {
                        
                        state.method.params = updatedParams
                        return {
                            ...state,
                            paramsFormActive: false,
                            paramsData: undefined,
                            method: state.method
                        }
                    }, () => {
                        this.props.onSubmit(this.state.method as MethodBlock, true)
                    })
                }}
            />
        )
    }


    protected getFields(paramsFormActive: boolean): JSX.Element | undefined {

        if (paramsFormActive) return undefined
        const data = this.state.method
        return (
            <React.Fragment>
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
            </React.Fragment>


        )
    }

    protected getButton(paramsFormActive: boolean): JSX.Element | undefined {
        if (paramsFormActive) return undefined
        return (
            <SubmitButton
                        key="submit_button"
                        title={MethodBlockFieldLabels.submit}
                        onPress={() => {
                            this.validate()
                        }}
                    />
        )
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
                    { this.getFields(this.state.paramsFormActive) }
                    {this.paramsList(this.state.paramsFormActive, this.state.paramsData)}
                    { this.getButton(this.state.paramsFormActive) }
                </div>
            </div>

        )
    }

}

