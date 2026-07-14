import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {finalize, Observable, tap} from 'rxjs';

import {
    AstushaUser,
    AuthResponse,
    CreateAccountPayload,
    EmailTwoFactorRequiredResponse,
    ForgotPasswordPayload,
    LoginPayload,
    ResetPasswordPayload,
    VerifyEmailTwoFactorPayload,
    EmailVerifyPayload,
    CreateAccountResponse,
    EmailVerificationRequiredResponse
} from '../../../shared/interfaces';
import {UsersService} from './users.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly usersService = inject(UsersService);

    private readonly baseApiUrl = '/api/auth';

    createAccount(
        payload: CreateAccountPayload
    ): Observable<CreateAccountResponse> {
        return this.http.post<CreateAccountResponse>(
            `${this.baseApiUrl}/create-account`,
            payload
        );
    }

    verifyEmail(payload: EmailVerifyPayload): Observable<AstushaUser> {
        return this.http
            .post<AstushaUser>(
                `${this.baseApiUrl}/email-verification/verify`,
                payload
            )
            .pipe(
                tap(user => {
                    this.usersService.setCurrentUser(user);
                })
            );
    }
    login(payload: LoginPayload): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.baseApiUrl}/login`, payload)
            .pipe(
                tap(response => {
                    if (
                        !this.isEmailTwoFactorRequired(response) &&
                        !this.isEmailVerificationRequired(response)
                    ) {
                        this.usersService.setCurrentUser(response);
                    }
                })
            );
    }

    verifyEmailTwoFactor(
        payload: VerifyEmailTwoFactorPayload
    ): Observable<AstushaUser> {
        return this.http
            .post<AstushaUser>(
                `${this.baseApiUrl}/two-factor/email/verify`,
                payload
            )
            .pipe(
                tap(user => {
                    this.usersService.setCurrentUser(user);
                })
            );
    }

    refresh(): Observable<AstushaUser> {
        return this.http
            .post<AstushaUser>(`${this.baseApiUrl}/refresh`, null)
            .pipe(
                tap(user => {
                    this.usersService.setCurrentUser(user);
                })
            );
    }

    logout(): Observable<void> {
        return this.http.post<void>(`${this.baseApiUrl}/logout`, null).pipe(
            finalize(() => {
                this.usersService.clearCurrentUser();
            })
        );
    }

    resetPasswordRequest(payload: ForgotPasswordPayload): Observable<void> {
        return this.http.post<void>(
            `${this.baseApiUrl}/password-reset/request`,
            payload
        );
    }

    confirmPasswordReset(payload: ResetPasswordPayload): Observable<void> {
        return this.http.post<void>(
            `${this.baseApiUrl}/password-reset/confirm`,
            payload
        );
    }

    private isEmailTwoFactorRequired(
        response: AuthResponse
    ): response is EmailTwoFactorRequiredResponse {
        return (
            'twoFactorRequired' in response &&
            response.twoFactorRequired === true
        );
    }

    private isEmailVerificationRequired(
        response: AuthResponse
    ): response is EmailVerificationRequiredResponse {
        return (
            'emailVerificationRequired' in response &&
            response.emailVerificationRequired === true
        );
    }
}
