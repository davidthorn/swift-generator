import Joi, {  ValidationErrorItem } from 'joi'

export interface FieldError {
    name: string
    error?: string
    joiError: ValidationErrorItem
    type: string
}
