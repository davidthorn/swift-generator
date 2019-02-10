import React, { Component } from "react"
import { PageNames } from "../../features/Home/PageNames";
import { Pages } from "../../features/Home/Pages";

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
            <ul>
            <li onClick={() => this.props.navigate(Pages.overview)}>
                {PageNames.overview}
            </li>
            <li onClick={() => this.props.navigate(Pages.information)}>
                {PageNames.information}
            </li>
            <li onClick={() => this.props.navigate(Pages.methods)}>
                {PageNames.methods}
            </li>
            <li onClick={() => this.props.navigate(Pages.properties)}>
                {PageNames.properties}
            </li>
        </ul>
        )
    }

}
