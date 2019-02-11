import React, { Component } from "react";
import MethodsList from "../../components/MethodsList/MethodsList";
import { Navbar } from '../../components/Navbar/Navbar';
import { NavbarButton } from "../../components/Navbar/NavbarButton";
import './MethodsList.style.css';
import { MethodsListFeatureProps } from "./MethodsListFeatureProps";
import { MethodsListFeatureState } from "./MethodsListFeatureState";
import { MethodsListFeatureViews } from "./MethodsListFeatureViews";
import { MethodBlockForm } from "../../components/MethodForm/MethodForm";
import { MethodBlock, RawMethodBlock } from "../../resources/methods";
import { AccessLevel } from "../../resources/accessLevelType";

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
     * @param {MethodsListFeatureViews} page
     * @memberof MethodsListFeature
     */
    navigate(page: MethodsListFeatureViews , params?: RawMethodBlock) {
        this.setState({
            prevView: page === MethodsListFeatureViews.form ? [this.state.view] : [],
            view: page,
            formParams: params
        })
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
                        const raw: RawMethodBlock = {
                            access: AccessLevel.internal,
                            params: []
                        }
                        this.props.addButtonPressed(() => {
                            this.navigate(MethodsListFeatureViews.form, raw);
                        })
                        
                    }
                }];
                break;
            default: return [];
        }
    }

    protected updateMethods(method: MethodBlock , redirect: boolean ) {
    
        let methods = this.state.methods

        if(methods.filter(i => i.id === method.id).length !== 1) {
            methods.push(method)
        } else {
            methods = methods.map(i => { return i.id === method.id ? method : i })
        }

        this.setState((state) => {
            return {
                prevView: redirect ? state.prevView.splice(0, state.prevView.length - 1) : state.prevView,
                view: redirect ? MethodsListFeatureViews.list : state.view,
                formParams: redirect ? undefined : method,
                methods: methods
            }
        }, () => {
            this.props.updated(this.state.methods , redirect)
        })

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
            if(this.state.formParams === undefined) throw new Error('Form Params cannot be undefined')
            return (
                <MethodBlockForm
                method={this.state.formParams}
                onSubmit={(method, redirect) => {
                    this.updateMethods(method, redirect)
                }}
                />
                )
                // return (<div>

                //     <div className="save-method-button" onClick={() => {
                //         this.navigate(MethodsListFeatureViews.list);
                //     }}>Save Button</div>

                // </div>);
            case MethodsListFeatureViews.list:
                return (<div className="methods-list-wrapper">
                    <MethodsList 
                    editButtonPressed={this.props.editButtonPressed}
                    deleteButtonPressed={this.props.deleteButtonPressed}
                    methods={this.state.methods}></MethodsList>
                </div>);
        }
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

}

