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
import { MethodsListFeatureViews } from "../Methods/MethodsListFeatureViews";

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
        this.updateState(struct)
        this.forceUpdate(() => {
            console.log('forced update')
        })
    }

    /**
     *
     *
     * @protected
     * @param {DataStructure} structure
     * @memberof HomeFeature
     */
    protected updateState(structure: DataStructure, page: Pages = Pages.overview) {
        console.log('upadting state' , structure)
        this.setState((state) => {
            const s = state.dataStructure
            structure.methods = s.methods
            structure.properties = s.properties
            return {
                ...state,
                page: page,
                dataStructure: structure
            }
        }, () => {
            console.log('upadting local storage')
            localStorage.setItem('structure', JSON.stringify(this.state.dataStructure));
        })

    }

    deleteMethod(method: MethodBlock) {
        const _save_methods = this.state.dataStructure.methods.filter(i => i.id !== method.id)
        const struct = this.state.dataStructure
        struct.methods = _save_methods
        this.updateState(struct, this.state.page)
    }

    editMethod(method: MethodBlock) {
        const _save_methods = this.state.dataStructure.methods.map(i => {
            return i.id === method.id ? method : i
        })
        const struct = this.state.dataStructure
        struct.methods = _save_methods
        this.updateState(struct, this.state.page)
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
                        {this.getPageElement(this.state.page, this.state.dataStructure)}
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
    protected getMethodsListFeature(methods: MethodBlock[]): JSX.Element {
        return (
            <MethodsListFeature
                deleteButtonPressed={this.deleteMethod.bind(this)}
                editButtonPressed={this.editMethod.bind(this)}
                view={MethodsListFeatureViews.list}
                addButtonPressed={(completion) => {
                    completion()
                }}
                backButtonPressed={(completion) => {
                    completion()
                }}
                updated={this.updateStructure.bind(this)}
                methods={methods}
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
                deleteButtonPressed={this.deleteMethod.bind(this)}
                editButtonPressed={this.editMethod.bind(this)}
                structure={this.state.dataStructure}
                onSubmit={(structure, redirect) => {
                    switch(redirect) {
                        case true:
                            this.updateState(structure)
                        break
                        case false:
                            this.updateState(structure, this.state.page)
                        break
                    }
                }} />
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

    protected getPageElement(page: Pages, structure: DataStructure): JSX.Element {
        switch (page) {
            case Pages.overview:
                return this.getOverviewFeature()
            case Pages.information:
                return this.getInformationFeature()
            // case Pages.methods:
            //     return this.getMethodsListFeature(structure.methods)
            case Pages.properties:
                return (<div>Properties</div>);
        }
    }
}

export { HomeFeature };

