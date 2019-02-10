import React, { Component } from "react";
import { DataStructure } from "../../resources/dataStructure";
import { MethodBlock } from "../../resources/methods";
import { CodeBox } from "../Code/Code";

interface OverviewFeatureProps {
    structure: DataStructure
}

interface OverviewFeatureState {

}

export class OverviewFeature extends Component<OverviewFeatureProps, OverviewFeatureState> {

    /**
     *Creates an instance of OverviewFeature.
     * @param {OverviewFeatureProps} props
     * @param {OverviewFeatureState} state
     * @memberof OverviewFeature
     */
    constructor(props: OverviewFeatureProps, state: OverviewFeatureState) {
        super(props, state)
        this.state = {
        }
    }

    /**
     *
     *
     * @returns
     * @memberof OverviewFeature
     */
    render() {

        const data = this.props.structure

        console.log(data)

        return (
            <CodeBox 
                access={data.accessLevel}
                type={data.type}
                name={data.name}
                properties={data.properties}
                implements={data.implements}
                init={this.getInitMethod()}
                methods={this.getMethods()}
                extends={data.extends}></CodeBox>
        )
    }

    /**
     * Returns a MethodBlock which has the name if `init` if one exists
     *
     * @protected
     * @returns {(MethodBlock | undefined)}
     * @memberof OverviewFeature
     */
    protected getInitMethod(): MethodBlock | undefined {
        const methods = this.props.structure.methods.filter(i => i.name === 'init')
        return methods.length === 1 ? methods[0] : undefined 
    }
    
    /**
     *
     *
     * @protected
     * @returns {MethodBlock[]}
     * @memberof OverviewFeature
     */
    protected getMethods(): MethodBlock[] {
        return this.props.structure.methods.filter(i => i.name !== 'init')
    }
}

