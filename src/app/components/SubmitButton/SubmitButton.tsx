import React, { Component } from "react"
import './SubmitButton.css'

interface SubmitButtonProps {
    title: string
    onPress: (button: SubmitButton) => void
}

interface SubmitButtonState {

}

export class SubmitButton extends Component<SubmitButtonProps,SubmitButtonState> {

    constructor(props: SubmitButtonProps, state: SubmitButtonState ) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            <div className="submit-button" onClick={(e) => this.props.onPress(this)}>
                {this.props.title}
            </div>
        )
    }

}

