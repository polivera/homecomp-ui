# Run a specific test by name
test name:
    npm run test:unit -- -t "{{name}}" --run

# Run a specific test in watch mode
test-watch name:
    npm run test:unit -- -t "{{name}}"

# Run all tests
test-all:
    npm run test:unit -- --run

# Run all tests in watch mode
test-all-watch:
    npm run test:unit
