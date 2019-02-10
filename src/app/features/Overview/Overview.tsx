import React, { Component } from "react"
import { CodeBox } from "../Code";
import { DataStructure } from "../../resources/dataStructure";

interface OverviewFeatureProps {
    structure: DataStructure
}

interface OverviewFeatureState {

}

export default class OverviewFeature extends Component<OverviewFeatureProps, OverviewFeatureState> {

    constructor(props: OverviewFeatureProps , state: OverviewFeatureState) {
        super(props, state)
        this.state = {
        }
    }

    render() {

        const data = this.props.structure

        return (
           <CodeBox access="fileprivate" 
                                    type="class" 
                                    name={data.name}
                                    properties={
                                        [
                                            {
                                                name: 'surname',
                                                access: 'internal',
                                                arc: 'weak',
                                                defaultValue: 'David',
                                                optional: true,
                                                overrides: false,
                                                type: 'String'
                                                
                                            }
                                        ]
                                    }
                                    implements={data.implements}
                                    init={{
                                        name: 'init',
                                        access: 'public',
                                        overrides: true,
                                        params: [
                                            {
                                                label: 'name',
                                                optional: false,
                                                value: 'String'
                                            },
                                            {
                                                label: 'surname',
                                                optional: false,
                                                value: 'String'
                                            }
                                        ]
                                    }}
                                    methods={[{
                                        name: 'dog',
                                        access: 'public',
                                        params: [
                                            {
                                                name: '_',
                                                label: 'name',
                                                optional: false,
                                                value: 'String'
                                            },
                                            {
                                                name: '_',
                                                label: 'surname',
                                                optional: false,
                                                value: 'String'
                                            }
                                        ],
                                        overrides: true,
                                        returnType: 'String'
                                    }]}
                                    extends={data.extends}></CodeBox>
        )
    }

}

