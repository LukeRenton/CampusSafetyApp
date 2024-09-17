module.exports = {
    rootDir: './', // Points to the server directory
    testEnvironment: 'node', // Use the Node.js environment for testing
    coverageDirectory: './coverage', // Save coverage reports in the server/coverage folder
    collectCoverage: true,
    collectCoverageFrom: ['**/*.js', '!**/node_modules/**'], // Include JS files, exclude node_modules
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'], // Test files
  };
  