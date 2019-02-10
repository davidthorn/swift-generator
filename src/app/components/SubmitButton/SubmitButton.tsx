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
        const size = this.props.size || 'medium'
        const type = this.props.type || 'normal'
        let className = 'submit-button'

        switch(size) {
            case 'medium':
            className += '-medium'
            break;
            case 'normal': break;
            case 'small':
            className += '-small'
            break;
        }

        switch(type) {
            case 'none':
            className += ' none-btn'
            break;
            case 'normal': 
            className += ' normal-btn'
            break;
            case 'danger':
            className += ' danger-btn'
            break;
        }

        return (
            <div className={className} onClick={(e) => this.props.onPress(this)}>
                <span>
                    {this.props.title}
                </span>
            </div>
        )
    }

}

