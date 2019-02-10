import React, { Component } from "react"
import './Navbar.css'

interface NavbarProps {
    onBackPress?: () => void
    shouldShowBackButton: () => boolean
    rightButtons: NavbarButton[]
    title:string
}

interface NavbarState {

}

export interface NavbarButton {
    id: string
    onPress: (button: NavbarButton) => void
}

export class Navbar extends Component<NavbarProps, NavbarState> {

    constructor(props: NavbarProps, state: NavbarState) {
        super(props, state)
        this.state = {
        }
    }

    back() {
        if(this.props.onBackPress === undefined) return
        this.props.onBackPress()
    }

    render() {
        const backButton = () => {
            return (
                <div className="inner-navbar-back-button" onClick={() => this.back()}>
                    back
                </div>
            )
        }

        return (
           <div className="inner-navbar">
            { this.props.shouldShowBackButton() ? backButton() : '' }
            <div className="inner-navbar-back-title">
            { this.props.title }
            </div>
            <div className="inner-navbar-right-buttons">
            {
                this.props.rightButtons.map( i => {
                    return (
                        <div className="navbar-right-button" onClick={() => {
                            i.onPress(i)
                        }}></div>
                    )
                })
            }
            </div>
           </div>
        )
    }

}
