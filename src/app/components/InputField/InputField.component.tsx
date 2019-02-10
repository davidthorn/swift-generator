import React, { Component } from "react"
import  './InputField.css'

interface InputFieldProps {
    id?: string
    name?: string
    label: string
    value: string
    type: 'text' | 'email' | 'password' | 'email'
    placeholder?: string
    onChange?: (value: string) => void
    errors?:string[] 
}

interface InputFieldState {
    value: string   
}

export default class InputField extends Component<InputFieldProps,InputFieldState> {

    constructor(props: InputFieldProps, state: InputFieldState) {
        super(props, state)
        this.state = {
            value: props.value
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: event.target.value} , () => {
            if(this.props.onChange === undefined) return
            this.props.onChange(this.state.value)
        });
        
    }

    render() {

        const errorsHolder = (errors?: string[]) => {
            if(errors === undefined) return
            if(errors.length === 0) return
            return (
                <span className="error-holder">
                <ul>
                    { 
                    errors.map(i => (
                        <li>{i}</li>
                    )) 
                    }
                </ul>
             </span>
            )
        }

        return (
            <div className="field-group">
                { errorsHolder(this.props.errors) } 
             <label>{ this.props.label }</label>
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

}

