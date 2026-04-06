import { Page, Locator } from '@playwright/test';

export class LearnPage {
    readonly page: Page;
    readonly startButton: Locator;
    readonly settingOptionsButton: Locator;
    readonly resetSettingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.startButton = this.page.getByRole('button', { name: 'Start' });
        this.settingOptionsButton = this.page.getByRole('button', { name: 'Options' });
        this.resetSettingButton = this.page.getByRole('button', { name: 'Reset progress & restart' });

    }

    async resetSetting() {
        if (await this.settingOptionsButton.isVisible()) {
            await this.settingOptionsButton.click();
            await this.resetSettingButton.click();
            console.log('Settings have been reset.');
        } else {
            console.log('Reset button is not visible. No settings were reset.');
        }
    }

    // at set toggle status
    async setToggleByLabel(label: string, expectedStatus: boolean) {
        const toggle = this.getToggleByLabel(label);

        const className = await toggle.getAttribute('class');
        const isOn = className?.includes('knowt-33f3at') ?? false;

        if (isOn !== expectedStatus) {
            await toggle.click();
        }

        console.log(`${label} is now ${expectedStatus ? 'ON' : 'OFF'}`);
    }

    getToggleByLabel(label: string) {
        return this.page
            .locator('span', { hasText: label })
            .locator('button');
    }

    async clickStartButton() {
        await this.startButton.click();
    }

    //at practice flashcard status

}
