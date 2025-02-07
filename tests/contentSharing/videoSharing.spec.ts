import { test, expect } from '@playwright/test';
import { PomManager } from '../../pages/PomManager';
import { chromium } from 'playwright';

test.describe('Video Content Sharing Test', () => {
  let pm: PomManager;

  test.beforeEach(async ({ page }) => {
    pm = new PomManager(page);
    await pm.loginPage.goto('https://test.iprep.in/');
  });

  // Test Case: Check if the Video Playing through the Shared link is the Shared Video in the same tab
  test.only('Verify that the video playing through the shared link matches the original video in the same tab', async ({ page }) => {

    // login
    await pm.loginPage.login('6969696969');
    await pm.otpPopUp.otpVerify('696969');

    // Go to Academics Section
    await pm.homePage.goToAcademics();

    // Clicks on Maths
    await pm.academics.clickOnMath();

    // Go to Videos Section
    await pm.yourSubjects.goToVideoSection();

    // Clicks on Real Number Chapter
    await pm.videos.goToChaptersTopics();

    // Get the video topic detail
    let expectedVideoTopic = await pm.videos.getVideoTopic();

    // Clicks on Video topic
    await pm.videos.playTheTopicVideo();

    // Clicks on share Btn
    await pm.videos.clickOnShareBtn();

    // Get the value of share code
    let shareCode = await pm.videos.getShareCode();

    // Go to the shared link
    await pm.loginPage.goto(shareCode);

    // Get the current playing video topic title
    let actualVideoTopic = await pm.videos.getCurrentPlayingVideo(page);
    
    // Assertion: Checks if the shared video and palying video is same
    expect(actualVideoTopic).toContain(expectedVideoTopic);
  });

  // Test Case: Check if the Video Playing through the Shared link is the Shared Video in the new tab
  test.only('Verify that the video playing through the shared link matches the original video in a new tab', async ({ page }) => {

    // login
    await pm.loginPage.login('6969696969');
    await pm.otpPopUp.otpVerify('696969');

    // Go to Academics Section
    await pm.homePage.goToAcademics();

    // Clicks on Maths
    await pm.academics.clickOnMath();

    // Go to Videos Section
    await pm.yourSubjects.goToVideoSection();

    // Clicks on Real Number Chapter
    await pm.videos.goToChaptersTopics();

    // Get the video topic detail
    let expectedVideoTopic = await pm.videos.getVideoTopic();

    // Clicks on Video topic
    await pm.videos.playTheTopicVideo();

    // Clicks on share Btn
    await pm.videos.clickOnShareBtn();

    // Get the value of share code
    let shareCode = await pm.videos.getShareCode();

    // Open a new tab
    const newPage = await page.context().newPage();

    // Go to the shared link in the new tab
    await newPage.goto(shareCode);

    // Wait for a few seconds on the page, e.g., 10000 milliseconds (30 seconds)
    // await newPage.waitForTimeout(30000);

    // Get the current playing video topic title in the new tab
    let actualVideoTopic = await pm.videos.getCurrentPlayingVideo(newPage);

    // Close the new tab after verification
    await newPage.close();

    // Assertion: Checks if the shared video and playing video is same
    expect(actualVideoTopic).toContain(expectedVideoTopic);
  });

  // Test Case: Check if the Video Playing through the Shared link is the Shared Video in the new browser tab
  test.only('Verify that the video playing through the shared link matches the original video in a new browser', async () => {
          
          // Login
          await pm.loginPage.login('6969696969');
          await pm.otpPopUp.otpVerify('696969');
      
          // Go to Academics Section
          await pm.homePage.goToAcademics();
      
          // Click on Maths
          await pm.academics.clickOnMath();
      
          // Go to Videos Section
          await pm.yourSubjects.goToVideoSection();
      
          // Click on Real Number Chapter
          await pm.videos.goToChaptersTopics();
      
          // Get the video topic detail
          let expectedVideoTopic = await pm.videos.getVideoTopic();
      
          // Click on Video topic
          await pm.videos.playTheTopicVideo();
      
          // Click on Share Button
          await pm.videos.clickOnShareBtn();
      
          // Get the value of the share code
          let shareCode = await pm.videos.getShareCode();
  
          // Launch a new browser instance after getting shareCode
          const newBrowser = await chromium.launch();
          const newContext = await newBrowser.newContext();
          const newPage = await newContext.newPage();
  
          // Go to the shared link in the new browser instance
          await newPage.goto(shareCode);
  
          // Login again in the new browser
          const newPm = new PomManager(newPage);
          await newPm.loginPage.login('6969696969');
          await newPm.otpPopUp.otpVerify('696969');
      
          // Get the current playing video topic title in the new tab
          let actualVideoTopic = await newPm.videos.getCurrentPlayingVideo(newPage);
  
          // Assertion: Checks if the shared video and playing video are the same
          expect(actualVideoTopic).toContain(expectedVideoTopic);
  
          // Close the new browser instance after the test
          await newBrowser.close();
      });
});