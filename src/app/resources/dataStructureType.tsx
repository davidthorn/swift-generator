

enum DataStructureType {
    class = "class",
    struct = "struct",
    enum = "enum",
    protocol= "protocol" 
}

const keys = Object.values(DataStructureType)

const dataStructureTypes: string[] = keys.map((i) => {
    return DataStructureType[i]
})

const dataStructureTypesOptions: { id: string, name: string }[] = dataStructureTypes.map(i => {
    return {
        id: i,
        name: i
    }
})

export { dataStructureTypes, dataStructureTypesOptions,DataStructureType }
