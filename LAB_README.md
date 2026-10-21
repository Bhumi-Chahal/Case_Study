# Software Engineering Laboratory Practical Evidence

This branch adds verification and delivery examples to the supplied event-registration project. The existing Playwright configuration and tests remain available.

## Local execution

Run `npm ci`, then `npx playwright install chromium`. Run `npm run test:lab` for the eight existing tests using the additional lab configuration. It starts the website on port 3108 automatically.

For Selenium, start `node node_modules/http-server/bin/http-server Website -p 3108 -a 127.0.0.1 -c-1` in a separate terminal, then run `npm run test:selenium`. The suite uses a fresh Chrome session for each case and saves genuine screenshots and JSON results in `selenium-results`. Selenium Manager locates a compatible driver. Optional `CHROME_BINARY` and `CHROMEDRIVER` environment variables support an existing Chrome for Testing installation.

Run `npm run build:lab` to copy the static website into `dist`. The workflow verifies both suites and uploads this delivery package only after successful tests. It does not publish the site to a public hosting service.

## Scope

The website is a classroom demonstration with fixed login credentials and browser session storage. It has no backend authentication or persistent registration database. The success message demonstrates frontend submission handling only.
