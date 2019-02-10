import React, { Component } from "react"
import './GeneratorType.css'

interface GeneratorTypeProps {}

interface GeneratorTypeState { }

export default class GeneratorType extends Component<GeneratorTypeProps,GeneratorTypeState> {

    constructor(props: GeneratorTypeProps, state: GeneratorTypeState ) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            <div className="generator-type">
            </div>
        )
    }

}

