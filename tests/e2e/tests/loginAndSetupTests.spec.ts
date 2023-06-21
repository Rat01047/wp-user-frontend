require('dotenv').config();
import { test, expect, Page } from '@playwright/test';
import { basicLoginPage } from '../pages/basicLogin';
import { basicLogoutPage } from '../pages/basicLogout';
import { settingsSetup } from '../pages/settingsSetup' 
import { testData } from '../utils/testData'

import * as fs from "fs"; //Clear Cookie







export default function loginAndSetupTests() {


test.describe('TEST :-->', () => {

/**----------------------------------LOGIN----------------------------------**
     * 
     * 
     * @Test_Scenario : [LOGIN] 
     * @Test_001 : Admin is logging in...
     * @Test_002 : Admin is skipping WPUF setup...
     * @Test_003 : Admin is checking Dashboard page reached...
     * @Test_004 : Here, Admin is checking Plugin Status - Lite Activation...
     * @Test_005 : Here, Admin is visiting WPUF Page
     * @Test_006 : Admin is changing WPUF Settings...
     * @Test_007 : Admin is setting Permalink...
     * @Test_008 : Admin is creating a New User...
     * @Test_009 : Admin is able to Log out succesfully...
     * 
     * 
     *  
     */

    test('001:[Login] Here, Admin is logging into Admin-Dashboard', async ({ page }) => {
        const BasicLogin = new basicLoginPage(page);
        await BasicLogin.basicLogin(testData.users.adminUsername, testData.users.adminPassword);
    });


    test('002:[Login] Here, Admin is checking Dashboard page reached', async ({ page }) => {
        const BasicLogin = new basicLoginPage(page);
        await BasicLogin.validateBasicLogin();
    });


    test('003:[Login] Here, Admin is checking Plugin Status - Lite Activation', async ({ page }) => {
        const SettingsSetup = new settingsSetup(page);
        await SettingsSetup.pluginStatusCheckLite();
    });


    test('004:[Login] Here, Admin is Completing WPUF setup', async ({ page }) => {
        const SettingsSetup = new settingsSetup(page);
        await SettingsSetup.wpufSetup();
    });


    test('005:[Login] Here, Admin is visiting WPUF Page', async ({ page }) => {
        const SettingsSetup = new settingsSetup(page);
        await SettingsSetup.pluginVisitWPUF();
    });


    test('006:[Login] Here, Admin is changing WPUF Settings', async ({ page }) => {
        const SettingsSetup = new settingsSetup(page);
        await SettingsSetup.changeSettingsSetLoginPageDefault();
    });


    test('007: Here, Admin is setting Permalink', async ({page}) => {
        const SettingsSetup = new settingsSetup(page);
        await SettingsSetup.setPermalink();
    });


    test('008: Here, Admin is creating a New User', async ({page}) => {
        const SettingsSetup = new settingsSetup(page);
        
        //New User Credentials
        const userName = testData.users.userName;
        const email = testData.users.userEmail;
        const firstName = testData.users.userFirstName;
        const lastName = testData.users.userLastName;
        const password = testData.users.userPassword;

        await SettingsSetup.createNewUserAdmin(userName, email, firstName, lastName, password);
    });


    test('009: Here, Admin is logging out succesfully', async ({page}) => {
        const BasicLogout = new basicLogoutPage(page);
        
        //Logout
        await BasicLogout.logOut();

        fs.writeFile('state.json', '{"cookies":[],"origins": []}', function () { });

    });



    //--------------_END_--------------/
});


};