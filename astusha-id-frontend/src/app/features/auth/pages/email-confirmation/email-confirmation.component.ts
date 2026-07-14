import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {
    TuiButton,
    TuiLink,
    TuiNotificationService,
    TuiTextfield
} from '@taiga-ui/core';
import {TuiButtonLoading, TuiInputPin} from '@taiga-ui/kit';
import {catchError, EMPTY, finalize, tap} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-email-confirmation',
    imports: [
        ReactiveFormsModule,
        TuiButton,
        TuiInputPin,
        TuiLink,
        TuiTextfield,
        TuiButtonLoading
    ],
    templateUrl: './email-confirmation.component.html',
    styleUrl: './email-confirmation.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailConfirmationComponent implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly alerts = inject(TuiNotificationService);

    protected readonly isLoading = signal(false);

    protected readonly form = new FormGroup({
        challengeId: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        code: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.pattern(/^\d{6}$/)]
        })
    });

    ngOnInit() {
        const challengeId = sessionStorage.getItem(
            'emailVerificationChallengeId'
        );

        if (!challengeId) {
            void this.router.navigate(['/auth/create-account']);

            return;
        }

        this.form.controls.challengeId.setValue(challengeId);
    }

    protected confirmEmail() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();

            return;
        }

        this.isLoading.set(true);

        this.authService
            .verifyEmail(this.form.getRawValue())
            .pipe(
                tap(() => {
                    sessionStorage.removeItem('emailVerificationChallengeId');
                    sessionStorage.removeItem('emailVerificationEmail');

                    this.alerts
                        .open('Электронная почта успешно подтверждена', {
                            label: 'Аккаунт создан',
                            appearance: 'positive'
                        })
                        .subscribe();

                    void this.router.navigate(['/account/profile']);
                }),
                catchError(() => {
                    this.alerts
                        .open('Неверный или устаревший код подтверждения', {
                            label: 'Ошибка',
                            appearance: 'negative'
                        })
                        .subscribe();

                    return EMPTY;
                }),
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe();
    }

    protected backToRegistration() {
        sessionStorage.removeItem('emailVerificationChallengeId');
        sessionStorage.removeItem('emailVerificationEmail');

        void this.router.navigate(['/auth/create-account']);
    }
}
