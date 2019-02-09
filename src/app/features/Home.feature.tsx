import React, { Component } from "react"
import './Home.css'
import GeneratorType from "../components/GeneratorType.component";
import InputField from "../components/InputField/InputField.component";
import Highlight from 'react-highlight'
import { CodeBox } from './Code'

interface HomeProps {

}

interface HomeState {

}

class HomeFeature extends Component<HomeProps, HomeState> {

    constructor(props: HomeProps, state: HomeState) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            <div className="main-wrapper">
                <div className="header"></div>
                <div className="inner">
                    <div className="leftnavbar">
                    <GeneratorType ></GeneratorType>
                        <div className="generator-options">
                            <InputField
                                onChange={(v) => console.log(v)}
                                label="Name"
                                value="" placeholder="hello there"
                                type="text" ></InputField>
                        </div>
                    </div>

                    <div className="main-body">
                        <CodeBox access="fileprivate" 
                                    type="class" 
                                    name="Tester" 
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
                                    implements={[ 'Test1' , 'Test2' ]}
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
                                    extends="MyProtocol"></CodeBox>
                    </div>
                </div>
            </div>
        )
    }

}

export { HomeFeature }