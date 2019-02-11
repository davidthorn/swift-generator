enum DataStructureType {
    class = "class",
    struct = "struct",
    enum = "enum",
    protocol= "protocol" 
}

export enum ARCTypes {
    none = "none",
    weak = "weak",
    unowned = "unowned"
}

const keys = Object.values(DataStructureType)

const dataStructureTypes: string[] = keys.map((i) => {
    return DataStructureType[i]
})

const dataStructureTypesOptions: { id: string, name: string }[] = dataStructureTypes.map(i => {
    return {
        id: `type_${i}`,
        name: i
    }
})

const dataStructureTypesRadioOptions: { id: string, label: string , selected: boolean }[] = dataStructureTypes.map(i => {
    return {
        id: `type_${i}`,
        label: i,
        selected: false
    }
})



const arcTypesRadioOptions: { id: string, label: string , selected: boolean }[] = Object.values(ARCTypes).map(i => {
    return {
        id: `type_${i}`,
        label: i,
        selected: false
    }
})


export { dataStructureTypes, dataStructureTypesOptions,DataStructureType,dataStructureTypesRadioOptions, arcTypesRadioOptions }
