import { test, expect } from '@playwright/test';

test.describe('Futology Smoke Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/Futology/);
    
    // Check hero section is visible
    const hero = page.locator('h1');
    await expect(hero).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Click on Scores link
    await page.click('text=Scores');
    await expect(page).toHaveURL(/.*scores/);
    
    // Click on Predictions link
    await page.click('text=Predictions');
    await expect(page).toHaveURL(/.*predictions/);
  });

  test('login page accessible', async ({ page }) => {
    await page.goto('/login');
    
    // Check login form is present
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });
});
