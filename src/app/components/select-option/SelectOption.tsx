import React, { Component } from "react"
import './SelectOption.css'
import { SelectOptionProps } from "./SelectOptionProps";
import { SelectOptionState } from "./SelectOptionState";

/**
 *
 *
 * @class SelectOption
 * @extends {Component<SelectOptionProps, SelectOptionState>}
 */
class SelectOption extends Component<SelectOptionProps, SelectOptionState> {

    /**
     *Creates an instance of SelectOption.
     * @param {SelectOptionProps} props
     * @param {SelectOptionState} state
     * @memberof SelectOption
     */
    constructor(props: SelectOptionProps, state: SelectOptionState) {
        super(props, state)
        this.state = {
            value: ''
        }
    }

    /**
     * Called every time the value of the select element has changed
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} event
     * @memberof SelectOption
     */
    handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ value: event.target.value }, () => {
            if (this.props.onChange === undefined) return
            this.props.onChange(this.state.value)
        });

    }

    /**
     * Returns the options which should be displayed
     *
     * @protected
     * @returns {JSX.Element[]}
     * @memberof SelectOption
     */
    protected getOptions(): JSX.Element[] {
        return this.props.options.map(i => {
            return (
                <option key={i.id} value={i.id}>{i.name}</option>
            )
        })
    }

    /**
     *
     *
     * @returns
     * @memberof SelectOption
     */
    render() {
        return (
            <div className="field-group">
                <label>{this.props.label}</label>
                <select
                    onChange={this.handleChange.bind(this)}
                    className="option-list">
                    {this.getOptions()}
                </select>
            </div>
        )
    }

}

export { SelectOption }