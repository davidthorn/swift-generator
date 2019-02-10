import Joi from 'joi';
import { accessLevelTypes } from '../../resources/accessLevelType';
import { RawMethodProperty } from '../../resources/MethodProperty';

enum MethodPropertySchemaErrorTypes {
    require = "any.required",
    empty = "any.empty",
    expression = "string.regex.base"
}

enum MethodPropertySchemaErrorMessages {
    require = "{i} is required",
    empty = "{i} cannot be empty",
    expression = "Invalid {i} provided",
    access = "Access Level must be provided"
}

const MethodPropertySchema = Joi.object({
    id: Joi.string().optional(),
    arc: Joi.string().allow(['unowned' , 'weak' , 'none']).required().label('ARC'),
    access: Joi.string().allow(accessLevelTypes).required().label('Access Level').default('internal').error(() => {
        return MethodPropertySchemaErrorMessages.access
    }),
    overrides: Joi.string().optional().default('no'),
    name: Joi.string().regex(/^[\w\d]+$/).required().label('Name').error((d) => {
        return d.map(l => {
            switch(l.type) {
                case MethodPropertySchemaErrorTypes.require: 
                l.message = MethodPropertySchemaErrorMessages.require
                break
                case MethodPropertySchemaErrorTypes.empty: 
                l.message = MethodPropertySchemaErrorMessages.empty
                break
                case MethodPropertySchemaErrorTypes.expression:
                l.message = MethodPropertySchemaErrorMessages.expression
                break;
                default: break;
            }
            return l
        })
    }),
    type: Joi.string().regex(/^[\w\d]+$/).required().label('Type').error((d) => {
        return d.map(l => {
            switch(l.type) {
                case MethodPropertySchemaErrorTypes.require: 
                l.message = MethodPropertySchemaErrorMessages.require
                break
                case MethodPropertySchemaErrorTypes.empty: 
                l.message = MethodPropertySchemaErrorMessages.empty
                break
                case MethodPropertySchemaErrorTypes.expression:
                l.message = MethodPropertySchemaErrorMessages.expression
                break;
                default: break;
            }
            return l
        })
    }),
    optional: Joi.string().allow(['yes' , 'no']).optional().default('no').label('Optional'),
    lazy: Joi.string().allow(['yes' , 'no']).optional().default('no').label('Lazy'),
    readOnly: Joi.boolean().optional().default(false).label('Ready Only'),
    defaultValue: Joi.string().regex(/^[\w\d ]+$/).optional().label('Default Value').error((d) => {
        return d.map(l => {
            switch(l.type) {
                case MethodPropertySchemaErrorTypes.require: 
                l.message = MethodPropertySchemaErrorMessages.require
                break
                case MethodPropertySchemaErrorTypes.empty: 
                l.message = MethodPropertySchemaErrorMessages.empty
                break
                case MethodPropertySchemaErrorTypes.expression:
                l.message = MethodPropertySchemaErrorMessages.expression
                break;
                default: break;
            }
            return l
        })
    }),
   
 })
 
 const MethodPropertyValidate = (structure: RawMethodProperty): Joi.ValidationResult<RawMethodProperty> => {
    return MethodPropertySchema.validate(structure, {
        abortEarly: true
    })
}

export { MethodPropertyValidate };

