// Google Ads conversions, checked in Chrome: `npm test`.
// Every web request is aborted, so no check sends a hit to Analytics or Ads.
import { after, afterEach, before, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const conversion = ['event', 'conversion', { send_to: 'AW-17781826631/NGt1CLjzrswbEMfIhJ9C', value: 1, currency: 'PLN' }];
let browser, page;

before(async () => { browser = await chromium.launch({ channel: 'chrome' }); });
after(() => browser.close());
beforeEach(async () => {
  page = await browser.newPage();
  await page.route(/^https?:/, route => route.abort());
  await page.goto(new URL('../index.html', import.meta.url).href);
});
afterEach(() => page.close());

// gtag() pushes its arguments to dataLayer
const calls = () => page.evaluate(() => dataLayer.map(args => [...args]));
const conversions = async () => (await calls()).filter(([command, name]) => command === 'event' && name === 'conversion');

test('the Google tag configures Analytics and Ads', async () => {
  const ids = (await calls()).filter(([command]) => command === 'config').map(([, id]) => id);
  assert.deepEqual(ids, ['G-86EK0ZBK0T', 'AW-17781826631']);
});

test('a page view is no conversion', async () => {
  assert.deepEqual(await conversions(), []);
});

for (const name of ['Umów się na oglądanie', 'szbubak@gmail.com', 'Szymon · +48 795 768 014']) {
  test(`a click on "${name}" is one conversion`, async () => {
    await page.getByRole('link', { name, exact: true }).click();
    assert.deepEqual(await conversions(), [conversion]);
  });
}
