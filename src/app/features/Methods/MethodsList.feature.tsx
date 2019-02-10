import React, { Component } from "react";
import MethodsList from "../../components/MethodsList/MethodsList";
import { Navbar } from '../../components/Navbar/Navbar';
import { NavbarButton } from "../../components/Navbar/NavbarButton";
import './MethodsList.style.css';
import { MethodsListFeatureProps } from "./MethodsListFeatureProps";
import { MethodsListFeatureState } from "./MethodsListFeatureState";
import { MethodsListFeatureViews } from "./MethodsListFeatureViews";

/**
 * A Table showing all methods which the currently selected data structure contains
 *
 * @export
 * @class MethodsListFeature
 * @extends {Component<MethodsListFeatureProps, MethodsListFeatureState>}
 */
export class MethodsListFeature extends Component<MethodsListFeatureProps, MethodsListFeatureState> {

    /**
     *Creates an instance of MethodsListFeature.
     * @param {MethodsListFeatureProps} props
     * @param {MethodsListFeatureState} state
     * @memberof MethodsListFeature
     */
    constructor(props: MethodsListFeatureProps, state: MethodsListFeatureState) {
        super(props, state)
        this.state = {
            methods: this.props.methods,
            view: MethodsListFeatureViews.list,
            prevView: []
        }
    }

    /**
     * Navigates the methods list between the form and the table view
     *
     * @param {MethodsListFeatureViews} page
     * @memberof MethodsListFeature
     */
    navigate(page: MethodsListFeatureViews) {
        this.setState({
            prevView: this.state.prevView.concat([this.state.view]),
            view: page
        })
    }

    /**
     * renders the methods list feature
     *
     * @returns
     * @memberof MethodsListFeature
     */
    render() {

        return (
            <div className="methods-list-view">
                <Navbar
                    title={this.getPageMainTitle(this.state.view)}
                    rightButtons={this.getRightButtons(this.state.view)}
                    shouldShowBackButton={this.shouldShowBackButton.bind(this)}
                    onBackPress={this.navbarBackButtonPressed.bind(this)}
                ></Navbar>

                <div className="methods-list-view-body">
                    {this.getCurrentView(this.state.view)}
                </div>


            </div>
        )
    }

    /**
     *  Returns true if the states prevView array contains more than 0 views
     *
     * @protected
     * @returns {boolean}
     * @memberof MethodsListFeature
     */
    protected shouldShowBackButton(): boolean {
        return this.state.prevView.length > 0
    }

    /**
     * The navbar back button must only be displayed when the 
     * prevView array in the state has more than 0 items.
     *
     * @protected
     * @memberof MethodsListFeature
     */
    protected navbarBackButtonPressed() {
        if (this.state.prevView.length === 0) throw new Error('The button should not be displayed when it has 0 items')
        const route = this.state.prevView.pop()

        this.setState({
            view: route!,
            prevView: this.state.prevView
        })
    }

    /**
     *  Returns the string which will be used for the main title based 
     *  upon which view is being displayed
     * 
     * @protected
     * @param {MethodsListFeatureViews} page
     * @returns {string}
     * @memberof MethodsListFeature
     */
    protected getPageMainTitle(page: MethodsListFeatureViews): string {
        switch (page) {
            case MethodsListFeatureViews.list:
                return "Methods";
            case MethodsListFeatureViews.form:
                return "New Method";
        }
    }

    /**
     * Returns the right navigation buttons which should be displayed
     * based upon which view is being shown
     * 
     * The list view will show an add button indicating to the user that they can add
     * another method
     *
     * @protected
     * @param {MethodsListFeatureViews} page
     * @returns {NavbarButton[]}
     * @memberof MethodsListFeature
     */
    protected getRightButtons(page: MethodsListFeatureViews): NavbarButton[] {
        switch (page) {
            case MethodsListFeatureViews.list:
                return [{
                    id: 'add',
                    onPress: () => {
                        this.navigate(MethodsListFeatureViews.form);
                    }
                }];
                break;
            default: return [];
        }
    }

    /**
     * Returns tie view which should be shown based on the states view property
     *
     * @protected
     * @returns
     * @memberof MethodsListFeature
     */
    protected getCurrentView(view: MethodsListFeatureViews): JSX.Element {
        switch (view) {
            case MethodsListFeatureViews.form:
                return (<div>
                    <div className="save-method-button" onClick={() => {
                        this.navigate(MethodsListFeatureViews.list);
                    }}>Save Button</div>

                </div>);
            case MethodsListFeatureViews.list:
                return (<div className="methods-list-wrapper">
                    <div className="methods-list-navbar">
                        <div className="add-method-button" onClick={() => {
                            this.navigate(MethodsListFeatureViews.form);
                        }}>Add</div>
                    </div>
                    <MethodsList methods={this.state.methods}></MethodsList>
                </div>);
        }
    }
}

