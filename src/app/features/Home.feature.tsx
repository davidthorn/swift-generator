import React, { Component } from "react";
import { DataStructure } from "../resources/dataStructure";
import './Home.css';
import { AccessLevel } from "../resources/accessLevelType";
import { DataStructureType } from "../resources/dataStructureType";
import OverviewFeature from "./Overview/Overview";
import InformationFeature from "./Information/Information";
import MethodsListFeature from "./Methods/MethodsList";

enum Pages {
    overview = "overview",
    information = "information",
    methods = "methods",
    properties = "properties"
}

interface HomeProps {
    
}

interface HomeState {
    dataStructure: DataStructure
    page: Pages
}

class HomeFeature extends Component<HomeProps, HomeState> {

    constructor(props: HomeProps, state: HomeState) {
        super(props, state)
        const storage = localStorage.getItem('structure')
        const structure =  storage !== null ? JSON.parse(storage) : {
            accessLevel: AccessLevel.fileprivate,
            extends: undefined,
            implements: [],
            methods: [],
            name: '',
            properties: [],
            type: DataStructureType.class
        }
        this.state = {
            page: storage === null ? Pages.information : Pages.overview,
            dataStructure: structure
        }
    }

    setPage(page: Pages) {
        this.setState({
            page: page
        })
    }

    render() {

        const pageInfo = (page: Pages) => {
            switch(page) {
                case Pages.overview:
                return (
                    <OverviewFeature structure={this.state.dataStructure}></OverviewFeature>
                )
                case Pages.information:
                return (
                   <InformationFeature
                   structure={this.state.dataStructure}
                   onSubmit={structure => {
                       this.setState({
                           page: Pages.overview,
                           dataStructure: {
                               name: structure.name,
                               accessLevel: structure.accessLevel,
                               extends: structure.extends,
                               implements: structure.implements,
                               type: structure.type,
                               methods: this.state.dataStructure.methods,
                               properties: this.state.dataStructure.properties,
                           }
                       }, () => {
                           localStorage.setItem('structure' , JSON.stringify(this.state.dataStructure))
                       })
                   }}
                   />
                )
                case Pages.methods:
                return (
                    <MethodsListFeature
                        updated={(methods) => {
                            this.setState({
                                
                                dataStructure: {
                                    ...this.state.dataStructure,
                                    methods: methods
                                }
                            })
                        }}
                        methods={[]}
                    ></MethodsListFeature>
                )
                case Pages.properties:
                return (
                    <div>Properties</div>
                )
            }
        }

        return (
            <div className="main-wrapper">
                <div className="header"></div>
                <div className="inner">
                    <div className="leftnavbar">
                        <ul>
                            <li onClick={() =>  this.setPage(Pages.overview)}>
                                Overview
                            </li>
                            <li onClick={() =>  this.setPage(Pages.information)}>
                                Structure Information
                            </li>
                            <li onClick={() =>  this.setPage(Pages.methods)}>
                                Methods
                            </li>
                            <li onClick={() =>  this.setPage(Pages.properties)}>
                                Properties
                            </li>
                        </ul>
                    </div>

                    <div className="main-body">
                        { pageInfo(this.state.page) }
                        {/* <CodeBox access="fileprivate" 
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
                                    extends="MyProtocol"></CodeBox> */}
                    </div>
                </div>
            </div>
        )
    }

}

export { HomeFeature };
