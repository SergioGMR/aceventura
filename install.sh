#! /bin/bash
export PLAYWRIGHT_CLI_VERSION=$(bundle exec ruby -e 'puts Playwright::COMPATIBLE_PLAYWRIGHT_VERSION.strip')
bun install playwright@$PLAYWRIGHT_CLI_VERSION || bun install playwright@next
./node_modules/.bin/playwright install
bun run index.js