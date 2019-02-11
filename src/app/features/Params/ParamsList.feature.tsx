import React, { Component } from "react";
import PropertyList from "../../components/PropertyList/PropertyList";
import { Navbar } from '../../components/Navbar/Navbar';
import { NavbarButton } from "../../components/Navbar/NavbarButton";
import './ParamsList.style.css';
import { ParamsListFeatureProps } from "./ParamsListFeatureProps";
import { ParamsListFeatureState } from "./ParamsListFeatureState";
import { ParamsListFeatureViews } from "./ParamsListFeatureViews";
import { MethodBlockForm } from "../../components/MethodForm/MethodForm";
import { MethodBlock, RawMethodBlock, Params, RawParams } from "../../resources/methods";
import { AccessLevel } from "../../resources/accessLevelType";
import { MethodPropertyForm } from "../../components/PropertyForm/PropertyForm";
import { MethodProperty, RawMethodProperty } from "../../resources/MethodProperty";
import ParamsList from "../../components/ParamsList/ParamsList";
import { ParamsForm } from "../../components/ParamsForm/ParamsForm";

/**
 * A Table showing all methods which the currently selected data structure contains
 *
 * @export
 * @class ParamsListFeature
 * @extends {Component<ParamsListFeatureProps, ParamsListFeatureState>}
 */
export class ParamsListFeature extends Component<ParamsListFeatureProps, ParamsListFeatureState> {

    /**
     *Creates an instance of ParamsListFeature.
     * @param {ParamsListFeatureProps} props
     * @param {ParamsListFeatureState} state
     * @memberof ParamsListFeature
     */
    constructor(props: ParamsListFeatureProps, state: ParamsListFeatureState) {
        super(props, state)
        this.state = {
            params: this.props.params,
            view: ParamsListFeatureViews.list,
            prevView: [],
            formParams: undefined
        }
    }

    
    componentDidUpdate(prevProps, prevState, snap){
        if(prevProps.view === this.props.view) return
        this.navigate(this.props.view , this.state.formParams)
    }
    /**
     * Navigates the methods list between the form and the table view
     *
     * @param {ParamsListFeatureViews} page
     * @memberof ParamsListFeature
     */
    navigate(page: ParamsListFeatureViews , params?: RawParams) {
         this.setState((state) => {
            return {
                ...state,
                prevView: page === ParamsListFeatureViews.form ? [this.state.view] : [],
                formParams: params,
                view: page,
            }
        })
        this.setState({
            prevView: page === ParamsListFeatureViews.form ? [this.state.view] : [],
            view: page,
            formParams: params
        })
    }

   
    /**
     *  Returns true if the states prevView array contains more than 0 views
     *
     * @protected
     * @returns {boolean}
     * @memberof ParamsListFeature
     */
    protected shouldShowBackButton(): boolean {
        return this.state.prevView.length > 0
    }

    /**
     * The navbar back button must only be displayed when the 
     * prevView array in the state has more than 0 items.
     *
     * @protected
     * @memberof ParamsListFeature
     */
    protected navbarBackButtonPressed() {
        if (this.state.prevView.length === 0) throw new Error('The button should not be displayed when it has 0 items')
        this.props.backButtonPressed(() => {
            const route = this.state.prevView.pop()
            this.setState({
                view: route!,
                prevView: this.state.prevView
            })
        })
    }

    /**
     *  Returns the string which will be used for the main title based 
     *  upon which view is being displayed
     * 
     * @protected
     * @param {ParamsListFeatureViews} page
     * @returns {string}
     * @memberof ParamsListFeature
     */
    protected getPageMainTitle(page: ParamsListFeatureViews): string {
        switch (page) {
            case ParamsListFeatureViews.list:
                return "Params";
            case ParamsListFeatureViews.form:
                return "New Params";
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
     * @param {ParamsListFeatureViews} page
     * @returns {NavbarButton[]}
     * @memberof ParamsListFeature
     */
    protected getRightButtons(page: ParamsListFeatureViews): NavbarButton[] {
        switch (page) {
            case ParamsListFeatureViews.list:
                return [{
                    id: 'add',
                    onPress: () => {
                        const raw: RawParams = {}
                        const navigate = () => {
                            this.navigate(ParamsListFeatureViews.form, raw);
                        }
                        this.props.addButtonPressed(navigate.bind(this))
                        
                    }
                }];
                break;
            default: return [];
        }
    }

    protected updateProperty(param: Params ) {
        let params = this.state.params
        if(params.filter(i => i.id === param.id).length !== 1) {
            params.push(param)
        } else {
            params = params.map(i => { return i.id === param.id ? param : i })
        }

        this.setState((state) => {
            return {
                prevView: state.prevView.splice(0, state.prevView.length - 1),
                view: ParamsListFeatureViews.list,
                formParams: undefined,
                params: params
            }
        }, () => {
            this.props.updated(this.state.params)
        })

    }

    /**
     * Returns tie view which should be shown based on the states view property
     *
     * @protected
     * @returns
     * @memberof ParamsListFeature
     */
    protected getCurrentView(view: ParamsListFeatureViews): JSX.Element {
        switch (view) {
            case ParamsListFeatureViews.form:
            if(this.state.formParams === undefined) throw new Error('Form Params cannot be undefined')
            return (
                <ParamsForm
                params={this.state.formParams}
                onSubmit={this.updateProperty.bind(this)}
                />
                )
            case ParamsListFeatureViews.list:
                return (<div className="methods-list-wrapper">
                    <ParamsList 
                    editButtonPressed={this.props.editButtonPressed}
                    deleteButtonPressed={this.props.deleteButtonPressed}
                    params={this.state.params}></ParamsList>
                </div>);
        }
    }

     /**
     * renders the methods list feature
     *
     * @returns
     * @memberof ParamsListFeature
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

}

