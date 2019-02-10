import React from 'react';
import Highlight from 'react-highlight';
import { BaseCodeBox } from './BaseCodeBox';
import './Code.css'

/**
 *
 *
 * @class CodeBox
 * @extends {BaseCodeBox}
 */
class CodeBox extends BaseCodeBox {

    /**
     *Creates an instance of CodeBox.
     * @memberof CodeBox
     */
    constructor() {
        super()
        this.state = {}
    }

    /**
     *
     *
     * @returns
     * @memberof CodeBox
     */
    render() {
        return (
            <div className="code-wrapper">
                <Highlight language="swift">
                    {`
import UIKit
      
${ this.props.access} ${this.props.type} ${this.props.name}${this.getExtends()} {

    ${ this.getProperties()}

    ${ this.getInit()}

    ${this.getMethods()}

}
      
      `}
                </Highlight>
            </div>
        )
    }


}

export { CodeBox };

