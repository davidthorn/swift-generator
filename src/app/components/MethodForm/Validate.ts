import Joi from 'joi';
import { accessLevelTypes } from '../../resources/accessLevelType';
import { RawMethodBlock } from '../../resources/methods';

enum MethodBlockSchemaErrorTypes {
    require = "any.required",
    empty = "any.empty",
    expression = "string.regex.base"
}

enum MethodBlockSchemaErrorMessages {
    require = "Name is required",
    empty = "Name cannot be empty",
    expression = "Invalid name provided",
    access = "Access Level must be provided"
}

const MethodBlockSchema = Joi.object({
    id: Joi.string().optional(),
    returnType: Joi.string().optional(),
    overrides: Joi.boolean().optional(),
    params: Joi.array().optional(),
    access: Joi.string().allow(accessLevelTypes).required().label('Access Level').error(() => {
        return MethodBlockSchemaErrorMessages.access
    }),
    name: Joi.string().regex(/^[\w\d]+$/).required().label('Name').error((d) => {
        return d.map(l => {
            switch(l.type) {
                case MethodBlockSchemaErrorTypes.require: 
                l.message = MethodBlockSchemaErrorMessages.require
                break
                case MethodBlockSchemaErrorTypes.empty: 
                l.message = MethodBlockSchemaErrorMessages.empty
                break
                case MethodBlockSchemaErrorTypes.expression:
                l.message = MethodBlockSchemaErrorMessages.expression
                break;
                default: break;
            }
            return l
        })
    }),
 })
 
 const MethodBlockValidate = (structure: RawMethodBlock): Joi.ValidationResult<RawMethodBlock> => {
    return MethodBlockSchema.validate(structure, {
        abortEarly: false
    })
}

export { MethodBlockValidate };

