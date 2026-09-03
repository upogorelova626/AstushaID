import {Page} from '@playwright/test';

export class ConfirmEmailPage {
    constructor(private readonly page: Page) {}

    get codeInput() {
        return this.page.getByPlaceholder('••••••');
    }

    get confirmEmailButton() {
        return this.page.getByRole('button', {name: 'Подтвердить'});
    }
}
