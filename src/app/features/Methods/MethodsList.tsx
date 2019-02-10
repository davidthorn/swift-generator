import React, { Component } from "react"
import MethodsList from "../../components/MethodsList/MethodsList";
import { MethodBlock } from "../../resources/methods";
import { Navbar, NavbarButton } from '../../components/Navbar/Navbar'
import './MethodsList.css'

interface MethodsListFeatureProps {
    methods: MethodBlock[]
    updated: (methods: MethodBlock[]) => void
}

interface MethodsListFeatureState {
    methods: MethodBlock[]
    view: MethodsListFeatureViews
    prevView: MethodsListFeatureViews[]
}

enum MethodsListFeatureViews {
    list = "list",
    form = "form"
}


export default class MethodsListFeature extends Component<MethodsListFeatureProps, MethodsListFeatureState> {

    constructor(props: MethodsListFeatureProps, state: MethodsListFeatureState) {
        super(props, state)
        this.state = {
            methods: this.props.methods,
            view: MethodsListFeatureViews.list,
            prevView: []
        }
    }

    navigate(page: MethodsListFeatureViews) {
        this.setState({
            prevView: this.state.prevView.concat([this.state.view]),
            view: page
        })
    }

    render() {

        const currentView = (view: MethodsListFeatureViews) => {
            switch (view) {
                case MethodsListFeatureViews.form:
                    return (
                        <div>
                            <div className="save-method-button" onClick={() => {
                                this.navigate(MethodsListFeatureViews.list)
                            }} >Save Button</div>

                        </div>

                    )
                case MethodsListFeatureViews.list:
                    return (
                        <div className="methods-list-wrapper">
                            <div className="methods-list-navbar">
                                <div className="add-method-button" onClick={() => {
                                    this.navigate(MethodsListFeatureViews.form)
                                }} >Add</div>
                            </div>
                            <MethodsList
                                methods={this.state.methods}
                            ></MethodsList>
                        </div>
                    )
            }
        }

        const view = currentView(this.state.view)

        const rightButton: (page: MethodsListFeatureViews) => NavbarButton[] = (page) => {
            switch(page) {
                case MethodsListFeatureViews.list:
                return [{
                    id: 'add',
                    onPress:  () => {
                        this.navigate(MethodsListFeatureViews.form)
                    }
                }]
                break;
                default: return []
            }
        }


        const mainTitle: (page: MethodsListFeatureViews) => string = (page) => {
            switch(page) {
                case MethodsListFeatureViews.list:
                    return "Methods"
                case MethodsListFeatureViews.form:
                return "New Method"
            }
        }

        return (
            <div className="methods-list-view">
                <Navbar
                    title={mainTitle(this.state.view)}
                    rightButtons={rightButton(this.state.view)}
                    shouldShowBackButton={() => this.state.prevView.length > 0}
                    onBackPress={() => {
                        if (this.state.prevView.length === 0) return
                        const route = this.state.prevView.pop()
                        
                        this.setState({
                            view: route!,
                            prevView: this.state.prevView
                        }, () => {
                            
                        })
                        
                       
                    }}
                ></Navbar>

                <div className="methods-list-view-body">
                    {view}
                </div>
               

            </div>
        )
    }

}

