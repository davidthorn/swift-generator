import React, { Component } from "react"
import { MethodBlock } from "../../resources/methods";


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

        let items = this.props.methods.map(i => {
            return (<li key={i.id}>Item {i.name}</li>)
        })

        return (
            <ul>
                {items}
            </ul>
        )
    }

}

