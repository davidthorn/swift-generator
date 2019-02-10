import Joi from 'joi'
import { accessLevelTypes } from '../../resources/accessLevelType';
import { dataStructureTypes } from '../../resources/dataStructureType';
import { RawDataStructure, DataStructure } from '../../resources/dataStructure';

const implementsValidation = Joi.string().regex(/^[\w]+$/).optional().label('Method Name').error((d) => {
    return d.map(l => {
        switch(l.type) {
            case 'any.empty': 
            l.message = "Name cannot be empty"
            break
            case 'string.regex.base':
            l.message = 'Invalid name provided'
            break;
            default: break;
        }
        return l
    })
})

const DataStructureSchema = Joi.object({
    accessLevel: Joi.string().allow(accessLevelTypes).required().label('Access Level').error(() => {
        return "Access Level must be provided"
    }),
    name: Joi.string().regex(/^[\w\d]+$/).required().label('Name').error((d) => {
        return d.map(l => {
            switch(l.type) {
                case 'any.required': 
                l.message = "Name is required"
                break
                case 'any.empty': 
                l.message = "Name cannot be empty"
                break
                case 'string.regex.base':
                l.message = 'Invalid name provided'
                break;
                default: break;
            }
            return l
        })
    }),

    implements: Joi.array().items(implementsValidation).min(0).optional().label('Implements').error(() => {
        return "Implementations has invalid content"
    }),
    extends: Joi.string().regex(/^[\w\d]+$/).optional().allow('').label('Extends').error((d) => {
        return d.map(l => {
            switch(l.type) {
                case 'any.required': 
                l.message = "Extends is required"
                break
                case 'any.empty': 
                l.message = "Extends cannot be empty"
                break
                case 'string.regex.base':
                l.message = 'Invalid Extends provided'
                break;
                default: break;
            }
            return l
        })
    }),
    properties: Joi.array().min(0).required(),
    methods: Joi.array().min(0).required(),
    type: Joi.string().allow(dataStructureTypes)
 })
 
 const DataStructureValidate = (structure: RawDataStructure): Joi.ValidationResult<RawDataStructure> => {
    return DataStructureSchema.validate(structure, {
        abortEarly: false
    })
}

export { DataStructureValidate }
