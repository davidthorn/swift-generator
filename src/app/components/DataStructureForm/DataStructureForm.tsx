import React, { Component } from "react"
import { SelectOption } from "../select-option/SelectOption";
import InputField from "../InputField/InputField.component";
import { dataStructureTypesOptions } from "../../resources/dataStructureType";
import { accessLevelTypesOptions } from "../../resources/accessLevelType";


interface DataStructureFormProps {

}

interface DataStructureFormState {

}


export default class DataStructureForm extends Component<DataStructureFormProps, DataStructureFormState> {

    constructor(props: DataStructureFormProps, state: DataStructureFormState) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            <div className="form-section">
                <div className="form-section-navbar">
                    <h1 className="form-section-header">Data Structure Form</h1>
                    <div className="toggleButton"></div>
                </div>
                <div className="form-section-inner">
                    <InputField
                        onChange={(v) => console.log(v)}
                        label="Name"
                        value=""
                        placeholder="hello there"
                        type="text" />

                    <SelectOption
                        options={dataStructureTypesOptions}
                        id=""
                        defaultOption=""
                        key=""
                        label="Type"
                        name=""
                    />

                    <SelectOption
                        options={accessLevelTypesOptions}
                        id=""
                        defaultOption=""
                        key=""
                        label="Access Control"
                        name=""
                    />

                    <InputField
                        onChange={(v) => console.log(v)}
                        label="Extends"
                        value=""
                        placeholder="Extending"
                        type="text" />

                    <InputField
                        onChange={(v) => console.log(v)}
                        label="Implements (comma separated)"
                        value=""
                        placeholder="MyProtocol, OtherProtocol"
                        type="text" />
                </div>
            </div>

        )
    }

}

