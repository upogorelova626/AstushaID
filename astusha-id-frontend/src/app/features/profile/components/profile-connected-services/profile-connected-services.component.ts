import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {TuiBadge} from '@taiga-ui/kit';

interface ConnectedService {
    name: string;
    description: string;
    icon: string;
    badge: {
        text: string;
        appearance: 'positive' | 'info';
    };
    meta: {
        label: string;
        value: string;
    };
    action?: () => void;
}

@Component({
    selector: 'app-profile-connected-services',
    imports: [TuiIcon, TuiButton, TuiBadge],
    templateUrl: './profile-connected-services.component.html',
    styleUrl: './profile-connected-services.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileConnectedServicesComponent {
    protected readonly services: readonly ConnectedService[] = [
        {
            name: 'AstushaApp',
            description: 'Проекты, задачи, команды и спринты',
            icon: '@tui.kanban',
            badge: {
                text: 'Активен',
                appearance: 'positive'
            },
            meta: {
                label: 'Последний вход',
                value: 'Сегодня, 14:32'
            },
            action: () => this.goToAstushaApp()
        },
        {
            name: 'AstushaBook',
            description: 'Хэндбуки, документация и база знаний',
            icon: '@tui.book-open',
            badge: {
                text: 'Активен',
                appearance: 'positive'
            },
            meta: {
                label: 'Последний вход',
                value: 'Вчера, 21:15'
            },
            action: () => this.goToAstushaBook()
        },
        {
            name: 'AstushaMessage',
            description: 'Командное общение и обсуждения проектов',
            icon: '@tui.message-square-heart',
            badge: {
                text: 'Скоро',
                appearance: 'info'
            },
            meta: {
                label: 'Статус',
                value: 'В разработке'
            }
        }
    ];

    private goToAstushaApp() {
        window.location.href = 'http://localhost:4200/dashboard';
    }

    private goToAstushaBook() {
        window.location.href = 'http://localhost:4201/astusha/main-page';
    }
}
