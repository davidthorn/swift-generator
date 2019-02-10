import React, { Component } from "react"
import { Params } from "../../resources/methods";
import './ParamsList.css'
import '../MethodsList/MethodsList.css'
import { SubmitButton } from "../SubmitButton/SubmitButton";

interface ParamsListProps {
    params: Params[]
    editButtonPressed: (params: Params) => void
    deleteButtonPressed: (params: Params) => void
}

interface ParamsListState { 
    params: Params[]
}

export default class ParamsList extends Component<ParamsListProps, ParamsListState> {

    constructor(props: ParamsListProps, state: ParamsListState) {
        super(props, state)
        this.state = {
            params: props.params
        }
    }

    deleteParams(Params: Params) {
        const _save_params = this.state.params.filter(i => i.id !== Params.id)
        this.setState({
            params: _save_params
        }, () => {
            this.props.deleteButtonPressed(Params)
        })
    }

    editParams(Params: Params) {
        this.props.editButtonPressed(Params)
    }

    render() {

        let items = this.state.params.map((param,index) => {
            const mod = index % 2 === 0 ? 'row-light' : 'row-dark'
            const classes = `params-list-table-row ${mod}`
            return (
                <div key={param.id} className={classes}>
                    <div className="col-name">
                        { param.name }
                    </div>
                    <div className="col-edit-button">
                        <SubmitButton size='small' title="Edit" onPress={() => { 
                            this.editParams(param)
                        }} />
                    </div>
                    <div className="col-delete-button">
                        <SubmitButton type='danger' size='small' title="Delete" onPress={() => { 
                            this.deleteParams(param)
                        }} />
                    </div>
                </div>
            )
        })

        return (
            <div className="params-list-table">
                <div className="params-list-table-header">
                    <div className="header-name">
                        Params Name
                    </div>
                    <div className="col-edit-button"></div>
                    <div className="col-delete-button"></div>
                </div>

                { items }

            </div>

        )
    }

}

