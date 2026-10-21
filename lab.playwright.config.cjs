module.exports = {
  testDir: './tests', timeout: 15000, workers: 1,
  reporter: [['list'], ['html', { outputFolder: 'lab-report', open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3108', headless: true,
    screenshot: 'on', trace: 'retain-on-failure',
    launchOptions: process.env.CHROME_BINARY ? {executablePath:process.env.CHROME_BINARY} : {}
  },
  webServer: { command: 'node node_modules/http-server/bin/http-server Website -p 3108 -a 127.0.0.1 -c-1', url: 'http://127.0.0.1:3108', reuseExistingServer: !process.env.CI }
};
