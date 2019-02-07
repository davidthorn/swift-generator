import React, { Component } from "react"
import './Home.css'

interface HomeProps {

}

interface HomeState {

}

class HomeFeature extends Component<HomeProps, HomeState> {

    constructor(props: HomeProps, state: HomeState) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            <div className="main-wrapper">
                <div className="header"></div>
                <div className="inner">
                    <div className="leftnavbar">
                    </div>

                    <div className="main-body">
                    </div>
                </div>
            </div>
        )
    }

}

export { HomeFeature }