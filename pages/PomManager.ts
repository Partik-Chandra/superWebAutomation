import { Page } from "@playwright/test";
import { LoginPage } from "./login/LoginPage";
import { OtpPopUp } from "./login/OtpPopUp";
import { SelectYourBoard } from "./login/SelectYourBoard";
import { ChooseYourLanguage } from "./login/ChooseYourLanguage";
import { ChooseYourGrade } from "./login/ChooseYousGrade";
import { ShareABitAboutYourself } from "./login/ShareABitAboutYourself";
import { HomePage } from "./dashboard/HomePage";
import { Academics } from "./dashboard/academics/Academics";
import { YourSubjects } from "./dashboard/academics/yourSubjects/YourSubjects";
import { Videos } from "./dashboard/academics/yourSubjects/Videos";

export class PomManager {
    readonly page: Page;

    // Login Module
    readonly loginPage: LoginPage;
    readonly otpPopUp: OtpPopUp;
    readonly selectBoardPage: SelectYourBoard;
    readonly chooseLanguagePage: ChooseYourLanguage;
    readonly chooseGradePage: ChooseYourGrade;
    readonly shareAboutYourselfPage: ShareABitAboutYourself;

    // Dashboard Module
    readonly homePage: HomePage;
    readonly academics: Academics;
    readonly yourSubjects: YourSubjects;
    readonly videos: Videos;

    constructor(page: Page) {
        this.page = page;

        // Login Module
        this.loginPage = new LoginPage(page);
        this.otpPopUp = new OtpPopUp(page);
        this.selectBoardPage = new SelectYourBoard(page);
        this.chooseLanguagePage = new ChooseYourLanguage(page);
        this.chooseGradePage = new ChooseYourGrade(page);
        this.shareAboutYourselfPage = new ShareABitAboutYourself(page);

        // Dashboard Module
        this.homePage = new HomePage(page);
        this.academics = new Academics(page);
        this.yourSubjects = new YourSubjects(page);
        this.videos = new Videos(page);
    }
}