import React, { Component } from "react"
import { PageNames } from "../../features/Home/PageNames";
import { Pages } from "../../features/Home/Pages";
import './StructureNavbar.css'

interface StructureNavbarProps {
    navigate: (page: Pages) => void
}

interface StructureNavbarState {}


/**
 *
 *
 * @export
 * @class StructureNavbar
 * @extends {Component<StructureNavbarProps, StructureNavbarState>}
 */
export class StructureNavbar extends Component<StructureNavbarProps,StructureNavbarState> {

    constructor(props: StructureNavbarProps, state: StructureNavbarState) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            <ul className="structure-navbar">
            <li onClick={() => this.props.navigate(Pages.overview)}>
                <span>
                    {PageNames.overview}
                </span>
                
            </li>
            <li onClick={() => this.props.navigate(Pages.information)}>
                <span>
                    {PageNames.information}
                </span>
            </li>
        </ul>
        )
    }

}
