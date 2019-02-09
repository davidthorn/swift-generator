import React,{ Component } from 'react'
import Highlight from 'react-highlight'
import { BaseCodeBox } from './BaseCodeBox'

class CodeBox extends BaseCodeBox {

    constructor() {
        super()
        this.state = {}
    }

    render() {

        

        return (
            <div>
    <Highlight language="swift">
      {`
import UIKit
      
${ this.props.access } ${ this.props.type } ${ this.props.name }${this.getExtends()} {

    ${ this.getProperties() }

    ${ this.getInit() }

    ${ this.getMethods() }

}
      
      `}
    </Highlight>
  </div>
        )
    }

    shouldComponentUpdate() {
        return true
    }

    componentWillUpdate(nextProps, nextContext) {
    }

    componentDidMount() {
        console.log(`componentDidMount ComponentName`)
    }

}

export { CodeBox }

