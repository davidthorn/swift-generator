import React, { Component } from "react";
import { StructureNavbar } from "../../components/StructureNavbar/StructureNavbar";
import { AccessLevel } from "../../resources/accessLevelType";
import { DataStructure, RawDataStructure } from "../../resources/dataStructure";
import { DataStructureType } from "../../resources/dataStructureType";
import { MethodBlock } from "../../resources/methods";
import { InformationFeature } from "../Information/Information";
import { MethodsListFeature } from "../Methods/MethodsList.feature";
import { OverviewFeature } from "../Overview/Overview";
import './Home.css';
import { HomeProps } from "./HomeProps";
import { HomeState } from "./HomeState";
import { Pages } from "./Pages";

/**
 *
 *
 * @class HomeFeature
 * @extends {Component<HomeProps, HomeState>}
 */
class HomeFeature extends Component<HomeProps, HomeState> {

    /**
     *Creates an instance of HomeFeature.
     * @param {HomeProps} props
     * @param {HomeState} state
     * @memberof HomeFeature
     */
    constructor(props: HomeProps, state: HomeState) {
        super(props, state)
        const storage = localStorage.getItem('structure')
        const structure = storage !== null ? JSON.parse(storage) : this.getDefaultStructure()
        this.state = {
            page: storage === null ? Pages.information : Pages.overview,
            dataStructure: structure
        }
    }

    /**
     *
     *
     * @protected
     * @returns {RawDataStructure}
     * @memberof HomeFeature
     */
    protected getDefaultStructure(): RawDataStructure {
        return {
            accessLevel: AccessLevel.fileprivate,
            extends: undefined,
            implements: [],
            methods: [],
            name: '',
            properties: [],
            type: DataStructureType.class
        }
    }

    /**
     *
     *
     * @param {Pages} page
     * @memberof HomeFeature
     */
    setPage(page: Pages) {
        this.setState({
            page: page
        })
    }

    protected updateStructure(methods: MethodBlock[]) {
        const struct = this.state.dataStructure
        struct.methods = methods
        this.setState({
            dataStructure: struct
        });
    }

    /**
     *
     *
     * @protected
     * @param {DataStructure} structure
     * @memberof HomeFeature
     */
    protected updateState(structure: DataStructure) {

        this.setState((state) => {
            const s = state.dataStructure
            structure.methods = s.methods
            structure.properties = s.properties
            return {
                ...state,
                page: Pages.overview,
                dataStructure: structure
            }
        }, () => {
            localStorage.setItem('structure', JSON.stringify(this.state.dataStructure));
        })

    }

    /**
     *
     *
     * @returns
     * @memberof HomeFeature
     */
    render() {

        return (
            <div className="main-wrapper">
                <div className="header"></div>
                <div className="inner">
                    <div className="leftnavbar">
                        <StructureNavbar
                            navigate={this.setPage.bind(this)}
                        />
                    </div>

                    <div className="main-body">
                        {this.getPageElement(this.state.page)}
                    </div>
                </div>
            </div>
        )
    }

    /**
     *
     *
     * @protected
     * @returns {JSX.Element}
     * @memberof HomeFeature
     */
    protected getMethodsListFeature(): JSX.Element {
        return (
            <MethodsListFeature
                updated={this.updateStructure.bind(this)}
                methods={this.state.dataStructure.methods}
            />
        );
    }

    /**
     *
     *
     * @protected
     * @returns
     * @memberof HomeFeature
     */
    protected getInformationFeature(): JSX.Element {
        return (
            <InformationFeature
                structure={this.state.dataStructure}
                onSubmit={this.updateState.bind(this)} />
        );
    }

    /**
     *
     *
     * @protected
     * @returns {JSX.Element}
     * @memberof HomeFeature
     */
    protected getOverviewFeature(): JSX.Element {
        return (
            <OverviewFeature
                structure={this.state.dataStructure}
            />
        );
    }

    protected getPageElement(page: Pages): JSX.Element {
        switch (page) {
            case Pages.overview:
                return this.getOverviewFeature()
            case Pages.information:
                return this.getInformationFeature()
            case Pages.methods:
                return this.getMethodsListFeature()
            case Pages.properties:
                return (<div>Properties</div>);
        }
    }
}

export { HomeFeature };

