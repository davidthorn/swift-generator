import Joi from 'joi';
import { accessLevelTypes } from '../../resources/accessLevelType';
import { RawParams } from '../../resources/methods';

enum ParamsSchemaErrorTypes {
    require = "any.required",
    empty = "any.empty",
    expression = "string.regex.base"
}

enum ParamsSchemaErrorMessages {
    require = "{i} is required",
    empty = "{i} cannot be empty",
    expression = "Invalid {i} provided",
    access = "Access Level must be provided"
}

const ParamsSchema = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().regex(/^[\w\d]+$/).required().label('Name').error((d) => {
        return d.map(l => {
            switch(l.type) {
                case ParamsSchemaErrorTypes.require: 
                l.message = ParamsSchemaErrorMessages.require
                break
                case ParamsSchemaErrorTypes.empty: 
                l.message = ParamsSchemaErrorMessages.empty
                break
                case ParamsSchemaErrorTypes.expression:
                l.message = ParamsSchemaErrorMessages.expression
                break;
                default: break;
            }
            return l
        })
    }),
    label: Joi.string().regex(/^[\w\d]+$/).required().label('Label').error((d) => {
        return d.map(l => {
            switch(l.type) {
                case ParamsSchemaErrorTypes.require: 
                l.message = ParamsSchemaErrorMessages.require
                break
                case ParamsSchemaErrorTypes.empty: 
                l.message = ParamsSchemaErrorMessages.empty
                break
                case ParamsSchemaErrorTypes.expression:
                l.message = ParamsSchemaErrorMessages.expression
                break;
                default: break;
            }
            return l
        })
    }),
    value: Joi.string().regex(/^[\w\d]+$/).required().label('Value').error((d) => {
        return d.map(l => {
            switch(l.type) {
                case ParamsSchemaErrorTypes.require: 
                l.message = ParamsSchemaErrorMessages.require
                break
                case ParamsSchemaErrorTypes.empty: 
                l.message = ParamsSchemaErrorMessages.empty
                break
                case ParamsSchemaErrorTypes.expression:
                l.message = ParamsSchemaErrorMessages.expression
                break;
                default: break;
            }
            return l
        })
    }),
     optional: Joi.boolean().optional().default(false).label('Optional'),
    
 })
 
 const ParamsValidate = (structure: RawParams): Joi.ValidationResult<RawParams> => {
    return ParamsSchema.validate(structure, {
        abortEarly: true
    })
}

export { ParamsValidate };

