import React, { Component } from "react";
import './InputField.css';
import { InputFieldProps } from "./InputFieldProps";
import { InputFieldState } from "./InputFieldState";

/**
 *
 *
 * @export
 * @class InputField
 * @extends {Component<InputFieldProps, InputFieldState>}
 */
export default class InputField extends Component<InputFieldProps, InputFieldState> {

    /**
     *Creates an instance of InputField.
     * @param {InputFieldProps} props
     * @param {InputFieldState} state
     * @memberof InputField
     */
    constructor(props: InputFieldProps, state: InputFieldState) {
        super(props, state)
        this.state = {
            value: props.value
        }
    }

    /**
     *
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event
     * @memberof InputField
     */
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value: event.target.value }, () => {
            if (this.props.onChange === undefined) return
            this.props.onChange(this.state.value)
        });

    }

    /**
     *
     *
     * @returns
     * @memberof InputField
     */
    render() {
        return (
            <div className="field-group">
                {this.getErrorsForField(this.props.errors)}
                <label>{this.props.label}</label>
                <input type="text"
                    id={this.props.id || ''}
                    onChange={this.handleChange.bind(this)}
                    name={this.props.name || ''}
                    value={this.state.value}
                    placeholder={this.props.placeholder || ''}
                />
            </div>
        )
    }

    /**
     *
     *
     * @protected
     * @param {string[]} [errors]
     * @returns {(JSX.Element | undefined)}
     * @memberof InputField
     */
    protected getErrorsForField(errors?: string[]): JSX.Element | undefined {
        if (errors === undefined) return
        if (errors.length === 0) return
        return (
            <span className="error-holder">
                <ul>
                    {errors.map(i => (<li>{i}</li>))}
                </ul>
            </span>
        );
    }
}

