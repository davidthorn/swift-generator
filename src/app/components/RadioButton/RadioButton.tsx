import React, { Component } from "react"
import './RadioButton.css'
import uuid  from 'uuid'

interface RadioButtonItem {
    id: string
    label: string
    selected: boolean
}

interface RadioButtonProps {
    onChange: (selected: RadioButtonItem) => void
    items: RadioButtonItem[]
    title: string
}

interface RadioButtonState {
    items: RadioButtonItem[]
}

export default class RadioButton extends Component<RadioButtonProps, RadioButtonState> {

    constructor(props: RadioButtonProps, state: RadioButtonState) {
        super(props, state)
        this.state = {
            items: props.items
        }
    }



    itemSelected(item: RadioButtonItem) {
        this.setState({
            items: this.state.items.map(i => {
                i.selected = i.id === item.id
                return i
            })
        }, () => {
            this.props.onChange(item)
        })
    }

    createItem(item: RadioButtonItem): JSX.Element {
        const classes = `radio-button-${item.selected ? 'checked' : 'unchecked'}`
        const icon = item.selected ? 'fas fa-check-circle' : 'far fa-check-circle'
        return (
            <React.Fragment  key={uuid.v4()}>
                <div className="radio-button-item">
                    <span className="radio-button-item-label">{item.label}:</span>
                    <span className={classes} onClick={() => this.itemSelected(item)}>
                        <i className={icon}></i>
                    </span>
                </div>
            </React.Fragment>
        )

    }

    render() {
        return (
            <React.Fragment>
                <div className="radio-button-group">
                    <div className="radio-button-group-title">{this.props.title}</div>

                    <div className="radio-button-group-items">
                        {this.state.items.map(this.createItem.bind(this))}
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

