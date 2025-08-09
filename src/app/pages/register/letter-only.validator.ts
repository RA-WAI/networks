import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lettersOnlyValidator(): ValidatorFn {
    return (ctrl: AbstractControl): { [key: string]: any } | null => {
        const value = ctrl.value;
        if (value && /[^a-zA-Z]/.test(value)) {
            return { lettersOnly: { value } };
        }
        return null;
    };
}
