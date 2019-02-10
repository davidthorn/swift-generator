import React, { Component } from "react"
import './SubmitButton.css'
import { SubmitButtonProps } from "./SubmitButtonProps";
import { SubmitButtonState } from "./SubmitButtonState";

/**
 *
 *
 * @export
 * @class SubmitButton
 * @extends {Component<SubmitButtonProps, SubmitButtonState>}
 */
export class SubmitButton extends Component<SubmitButtonProps, SubmitButtonState> {

    /**
     *Creates an instance of SubmitButton.
     * @param {SubmitButtonProps} props
     * @param {SubmitButtonState} state
     * @memberof SubmitButton
     */
    constructor(props: SubmitButtonProps, state: SubmitButtonState) {
        super(props, state)
        this.state = {
        }
    }

    /**
     *
     *
     * @returns
     * @memberof SubmitButton
     */
    render() {
        return (
            <div className="submit-button" onClick={(e) => this.props.onPress(this)}>
                {this.props.title}
            </div>
        )
    }

}

