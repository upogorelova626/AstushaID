import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal
} from '@angular/core';
import {AsyncPipe, DatePipe} from '@angular/common';
import {TuiError, TuiIcon, TuiInput, TuiTextfield} from '@taiga-ui/core';
import {TuiAvatar, TuiSkeleton} from '@taiga-ui/kit';
import {tap} from 'rxjs';
import {UsersService} from '../../../auth/services/users.service';

@Component({
    selector: 'app-profile-info-card',
    imports: [
        TuiTextfield,
        TuiInput,
        TuiError,
        TuiIcon,
        TuiAvatar,
        TuiSkeleton,
        DatePipe,
        AsyncPipe
    ],
    templateUrl: './profile-info-card.component.html',
    styleUrl: './profile-info-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileInfoCardComponent {
    private readonly usersService = inject(UsersService);

    protected readonly isLoading = signal(true);

    protected readonly currentUser$ = this.usersService.currentUser$.pipe(
        tap(user => {
            if (user) {
                this.isLoading.set(false);
            }
        })
    );
}
