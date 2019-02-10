import React, { Component } from "react"
import './Navbar.css'
import { NavbarProps } from "./NavbarProps";
import { NavbarState } from "./NavbarState";

/**
 *
 *
 * @export
 * @class Navbar
 * @extends {Component<NavbarProps, NavbarState>}
 */
export class Navbar extends Component<NavbarProps, NavbarState> {

    /**
     *Creates an instance of Navbar.
     * @param {NavbarProps} props
     * @param {NavbarState} state
     * @memberof Navbar
     */
    constructor(props: NavbarProps, state: NavbarState) {
        super(props, state)
        this.state = {}
    }

    /**
     * Called when the user has pressed the back.
     *
     * @memberof Navbar
     */
    back() {
        if (this.props.onBackPress === undefined) throw new Error(' The back button should not have been shown')
        if (!this.props.shouldShowBackButton()) throw new Error(' The back button should not have been shown')
        this.props.onBackPress()
    }

    /**
     *
     *
     * @protected
     * @returns {(JSX.Element[] | undefined)}
     * @memberof Navbar
     */
    protected getRightButtons(): JSX.Element[] | undefined {
        return this.props.rightButtons.map(i => {
            return (
                <div
                    className="navbar-right-button"
                    onClick={() => {
                        i.onPress(i)
                    }}>
                </div>
            )
        })
    }

    /**
     * Returns the 
     *
     * @protected
     * @returns {(JSX.Element | undefined)}
     * @memberof Navbar
     */
    protected getBackButton(): JSX.Element | undefined {
        if(!this.props.shouldShowBackButton()) return undefined
        if(this.props.onBackPress === undefined) return undefined
        return (
            <div
                className="inner-navbar-back-button"
                onClick={() => this.back()}>
                back
            </div>
        );
    }


    /**
     *
     *
     * @returns
     * @memberof Navbar
     */
    render() {
        return (
            <div className="inner-navbar">
                {this.props.shouldShowBackButton() ? this.getBackButton() : ''}
                <div className="inner-navbar-back-title">
                    {this.props.title}
                </div>
                <div className="inner-navbar-right-buttons">
                    {this.getRightButtons()}
                </div>
            </div>
        )
    }
}
