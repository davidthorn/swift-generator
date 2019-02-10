import React, { Component } from "react"
import './SelectOption.css'

interface SelectOptionItem  {
    id: string
    name: string
}

interface SelectOptionProps {
    label: string
    name: string
    id: string
    defaultOption: string
    onChange?: (value: string) => void
    options: SelectOptionItem[]

}

interface SelectOptionState {
    value: string
    
}

class SelectOption extends Component<SelectOptionProps,SelectOptionState> {

    constructor(props: SelectOptionProps, state: SelectOptionState) {
        super(props, state)
        this.state = {
            value: ''
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: event.target.value} , () => {
            if(this.props.onChange === undefined) return
            this.props.onChange(this.state.value)
        });
        
    }

    render() {

        const items = this.props.options.map(i => {
            return (
                <option key={i.id} value={i.id}>{i.name}</option>
            )
        })

        return (
            <div className="field-group">
            <label>{ this.props.label }</label>
            <select className="option-list">
                    { items }
            </select>
           </div>
        )
    }

}

export { SelectOption }