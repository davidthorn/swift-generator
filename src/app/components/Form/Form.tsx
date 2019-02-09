import React, { Component } from "react"
import './Form.css'
import InputField from "../InputField/InputField.component";

interface FormComponentProps {

}


interface FormComponentState {

}

export default class FormComponent extends Component<FormComponentProps, FormComponentState> {

    constructor(props: FormComponentProps , state: FormComponentState) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            
           <div className="form-group">
           <div className="form-section">
                <div className="form-section-navbar">
                    <h1 className="form-section-header">Data Structure Form</h1>
                    <div className="toggleButton"></div>
                </div>
                <div className="form-section-inner">
                    <InputField
                    onChange={(v) => console.log(v)}
                    label="Name"
                    value="" placeholder="hello there"
                    type="text" ></InputField>
                    <InputField
                    onChange={(v) => console.log(v)}
                    label="Name"
                    value="" placeholder="hello there"
                    type="text" ></InputField>
                    <InputField
                    onChange={(v) => console.log(v)}
                    label="Name"
                    value="" placeholder="hello there"
                    type="text" ></InputField>
                </div>
           </div>
                
                
           </div>
        )
    }

}

