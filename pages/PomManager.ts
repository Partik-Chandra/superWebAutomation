import { Page } from "@playwright/test";
import { LoginPage } from "./login/LoginPage";
import { OtpPopUp } from "./login/OtpPopUp";
import { SelectYourBoard } from "./login/SelectYourBoard";
import { ChooseYourLanguage } from "./login/ChooseYourLanguage";
import { ChooseYourGrade } from "./login/ChooseYousGrade";
import { ShareABitAboutYourself } from "./login/ShareABitAboutYourself";

export class PomManager {
    readonly page: Page;
    readonly loginPage: LoginPage;
    readonly otpPopUp: OtpPopUp;
    readonly selectBoardPage: SelectYourBoard;
    readonly chooseLanguagePage: ChooseYourLanguage;
    readonly chooseGradePage: ChooseYourGrade;
    readonly shareAboutYourselfPage: ShareABitAboutYourself;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.otpPopUp = new OtpPopUp(page);
        this.selectBoardPage = new SelectYourBoard(page);
        this.chooseLanguagePage = new ChooseYourLanguage(page);
        this.chooseGradePage = new ChooseYourGrade(page);
        this.shareAboutYourselfPage = new ShareABitAboutYourself(page);
    }
}