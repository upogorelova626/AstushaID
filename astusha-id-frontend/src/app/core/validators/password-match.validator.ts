import {AbstractControl, ValidatorFn} from '@angular/forms';

function addControlError(control: AbstractControl | null, errorKey: string) {
    if (!control || control.errors?.[errorKey]) {
        return;
    }

    control.setErrors({
        ...(control.errors ?? {}),
        [errorKey]: true
    });
}

function removeControlError(control: AbstractControl | null, errorKey: string) {
    if (!control?.errors?.[errorKey]) {
        return;
    }

    const errors = {...control.errors};

    delete errors[errorKey];

    control.setErrors(Object.keys(errors).length ? errors : null);
}

export function passwordMatchValidator(
    passwordControlName = 'password',
    confirmPasswordControlName = 'confirmPassword'
): ValidatorFn {
    return (control: AbstractControl) => {
        const passwordControl = control.get(passwordControlName);
        const confirmPasswordControl = control.get(confirmPasswordControlName);

        const password = passwordControl?.value;
        const confirmPassword = confirmPasswordControl?.value;

        if (!password || !confirmPassword) {
            removeControlError(confirmPasswordControl, 'passwordMismatch');

            return null;
        }

        if (password !== confirmPassword) {
            addControlError(confirmPasswordControl, 'passwordMismatch');
        } else {
            removeControlError(confirmPasswordControl, 'passwordMismatch');
        }

        return null;
    };
}
