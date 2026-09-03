import {ChangeDetectionStrategy, Component} from '@angular/core';

import {ProfileSecurityBannerComponent} from '../../components/profile-security-banner/profile-security-banner.component';
import {ProfileConnectedServicesComponent} from '../../components/profile-connected-services/profile-connected-services.component';
import {ProfileQuickActionsComponent} from '../../components/profile-quick-actions/profile-quick-actions.component';
import {ProfileInfoCardComponent} from '../../components/profile-info-card/profile-info-card.component';

@Component({
    selector: 'app-profile-page',
    imports: [
        ProfileSecurityBannerComponent,
        ProfileConnectedServicesComponent,
        ProfileQuickActionsComponent,

        ProfileInfoCardComponent
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {}
