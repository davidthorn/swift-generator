import React, { Component } from "react"
import { MethodBlock } from "../../resources/methods";
import './MethodsList.css'
import { SubmitButton } from "../SubmitButton/SubmitButton";

interface MethodsListProps {
    methods: MethodBlock[]
}

interface MethodsListState { }

export default class MethodsList extends Component<MethodsListProps, MethodsListState> {

    constructor(props: MethodsListProps, state: MethodsListState) {
        super(props, state)
        this.state = {
        }
    }

    render() {

        let items = this.props.methods.map((i,index) => {
            const mod = index % 2 === 0 ? 'row-light' : 'row-dark'
            const classes = `methods-list-table-row ${mod}`
            return (
                <div key={i.id} className={classes}>
                    <div className="col-name">
                        { i.name }
                    </div>
                    <div className="col-edit-button">
                        <SubmitButton title="Edit" onPress={() => { }} />
                    </div>
                    <div className="col-delete-button">
                        <SubmitButton title="Delete" onPress={() => { }} />
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

