import React, { Component } from "react";
import PropertyList from "../../components/PropertyList/PropertyList";
import { Navbar } from '../../components/Navbar/Navbar';
import { NavbarButton } from "../../components/Navbar/NavbarButton";
import './PropertiesList.style.css';
import { PropertiesListFeatureProps } from "./PropertiesListFeatureProps";
import { PropertiesListFeatureState } from "./PropertiesListFeatureState";
import { PropertiesListFeatureViews } from "./PropertiesListFeatureViews";
import { MethodBlockForm } from "../../components/MethodForm/MethodForm";
import { MethodBlock, RawMethodBlock } from "../../resources/methods";
import { AccessLevel } from "../../resources/accessLevelType";
import { MethodPropertyForm } from "../../components/PropertyForm/PropertyForm";
import { MethodProperty, RawMethodProperty } from "../../resources/MethodProperty";

/**
 * A Table showing all methods which the currently selected data structure contains
 *
 * @export
 * @class PropertiesListFeature
 * @extends {Component<PropertiesListFeatureProps, PropertiesListFeatureState>}
 */
export class PropertiesListFeature extends Component<PropertiesListFeatureProps, PropertiesListFeatureState> {

    /**
     *Creates an instance of PropertiesListFeature.
     * @param {PropertiesListFeatureProps} props
     * @param {PropertiesListFeatureState} state
     * @memberof PropertiesListFeature
     */
    constructor(props: PropertiesListFeatureProps, state: PropertiesListFeatureState) {
        super(props, state)
        this.state = {
            properties: this.props.properties,
            view: PropertiesListFeatureViews.list,
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
     * @param {PropertiesListFeatureViews} page
     * @memberof PropertiesListFeature
     */
    navigate(page: PropertiesListFeatureViews , params?: RawMethodProperty) {
        this.setState({
            prevView: page === PropertiesListFeatureViews.form ? [this.state.view] : [],
            view: page,
            formParams: params
        })
    }

   
    /**
     *  Returns true if the states prevView array contains more than 0 views
     *
     * @protected
     * @returns {boolean}
     * @memberof PropertiesListFeature
     */
    protected shouldShowBackButton(): boolean {
        return this.state.prevView.length > 0
    }

    /**
     * The navbar back button must only be displayed when the 
     * prevView array in the state has more than 0 items.
     *
     * @protected
     * @memberof PropertiesListFeature
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
     * @param {PropertiesListFeatureViews} page
     * @returns {string}
     * @memberof PropertiesListFeature
     */
    protected getPageMainTitle(page: PropertiesListFeatureViews): string {
        switch (page) {
            case PropertiesListFeatureViews.list:
                return "Properties";
            case PropertiesListFeatureViews.form:
                return "New Property";
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
     * @param {PropertiesListFeatureViews} page
     * @returns {NavbarButton[]}
     * @memberof PropertiesListFeature
     */
    protected getRightButtons(page: PropertiesListFeatureViews): NavbarButton[] {
        switch (page) {
            case PropertiesListFeatureViews.list:
                return [{
                    id: 'add',
                    onPress: () => {
                        const raw: RawMethodProperty = {
                            access: AccessLevel.internal,
                            arc: 'none'
                            
                        }
                        this.props.addButtonPressed(() => {
                            this.navigate(PropertiesListFeatureViews.form, raw);
                        })
                        
                    }
                }];
                break;
            default: return [];
        }
    }

    protected updateProperty(property: MethodProperty ) {
        console.log('updating property in property list feature')
        let properties = this.state.properties

        if(properties.filter(i => i.id === property.id).length !== 1) {
            properties.push(property)
        } else {
            properties = properties.map(i => { return i.id === property.id ? property : i })
        }

        this.setState((state) => {
            return {
                prevView: state.prevView.splice(0, state.prevView.length - 1),
                view: PropertiesListFeatureViews.list,
                formParams: undefined,
                properties: properties
            }
        }, () => {
            this.props.updated(this.state.properties)
        })

    }

    /**
     * Returns tie view which should be shown based on the states view property
     *
     * @protected
     * @returns
     * @memberof PropertiesListFeature
     */
    protected getCurrentView(view: PropertiesListFeatureViews): JSX.Element {
        switch (view) {
            case PropertiesListFeatureViews.form:
            if(this.state.formParams === undefined) throw new Error('Form Params cannot be undefined')
            return (
                <MethodPropertyForm
                property={this.state.formParams}
                onSubmit={this.updateProperty.bind(this)}
                />
                )
                // return (<div>

                //     <div className="save-method-button" onClick={() => {
                //         this.navigate(PropertiesListFeatureViews.list);
                //     }}>Save Button</div>

                // </div>);
            case PropertiesListFeatureViews.list:
                return (<div className="methods-list-wrapper">
                    <PropertyList 
                    editButtonPressed={this.props.editButtonPressed}
                    deleteButtonPressed={this.props.deleteButtonPressed}
                    properties={this.state.properties}></PropertyList>
                </div>);
        }
    }

     /**
     * renders the methods list feature
     *
     * @returns
     * @memberof PropertiesListFeature
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

