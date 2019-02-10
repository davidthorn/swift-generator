

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
        id: `access_level_${i}`,
        name: i
    }
})

export { accessLevelTypes, accessLevelTypesOptions, AccessLevel }
