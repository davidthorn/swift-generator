enum AccessLevel {
    internal = "internal",
    public = "public",
    open = "open",
    private = "private",
    fileprivate = "fileprivate"
}

const accessLevelTypes: string[] = Object.values(AccessLevel)

const accessLevelTypesOptions: { id: string, name: string }[] = accessLevelTypes.map(i => {
    return {
        id: `accessLevel_${i}`,
        name: i
    }
})

const accessLevelTypesRadioOptions: { id: string, label: string , selected: boolean }[] = accessLevelTypes.map(i => {
    return {
        id: `accessLevel_${i}`,
        label: i,
        selected: false
    }
})

export { accessLevelTypes,accessLevelTypesRadioOptions, accessLevelTypesOptions, AccessLevel }
