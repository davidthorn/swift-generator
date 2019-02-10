import React, { Component } from "react"
import { MethodBlock } from "../../resources/methods";
import './MethodsList.css'
import { SubmitButton } from "../SubmitButton/SubmitButton";

interface MethodsListProps {
    methods: MethodBlock[]
    editButtonPressed: (method: MethodBlock) => void
    deleteButtonPressed: (method: MethodBlock) => void
}

interface MethodsListState { 
    methods: MethodBlock[]
}

export default class MethodsList extends Component<MethodsListProps, MethodsListState> {

    constructor(props: MethodsListProps, state: MethodsListState) {
        super(props, state)
        this.state = {
            methods: props.methods
        }
    }

    deleteMethod(method: MethodBlock) {
        console.log('')
        const _save_methods = this.state.methods.filter(i => i.id !== method.id)
        this.setState({
            methods: _save_methods
        }, () => {
            this.props.deleteButtonPressed(method)
        })
    }

    editMethod(method: MethodBlock) {
        this.props.editButtonPressed(method)
    }

    render() {

        let items = this.state.methods.map((method,index) => {
            const mod = index % 2 === 0 ? 'row-light' : 'row-dark'
            const classes = `methods-list-table-row ${mod}`
            return (
                <div key={method.id} className={classes}>
                    <div className="col-name">
                        { method.name }
                    </div>
                    <div className="col-edit-button">
                        <SubmitButton title="Edit" onPress={() => { 
                            this.editMethod(method)
                        }} />
                    </div>
                    <div className="col-delete-button">
                        <SubmitButton title="Delete" onPress={() => { 
                            this.deleteMethod(method)
                        }} />
                    </div>
                </div>
            )
        })

        return (
            <div className="methods-list-table">
                <div className="methods-list-table-header">
                    <div className="header-name">
                        Method Name
                    </div>
                    <div className="col-edit-button"></div>
                    <div className="col-delete-button"></div>
                </div>

                { items }

            </div>

        )
    }

}

