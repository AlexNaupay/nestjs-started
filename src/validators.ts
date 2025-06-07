import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsCapitalized', async: false })
export class IsCapitalizedConstraint implements ValidatorConstraintInterface {
    validate(value: string): boolean {
        if (typeof value !== 'string') return false;
        return value.charAt(0).toUpperCase() === value.charAt(0);
    }

    defaultMessage(): string {
        return 'First character must be uppercase';
    }
}

export function IsCapitalized(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCapitalizedConstraint,
        });
    };
}
