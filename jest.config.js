module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/app/**', // should be tested in e2e
    '!src/lib/registry.tsx',
    '!src/types/**',
    '!src/hooks/**',
    '!src/lib/**',
    '!src/components/ui/**',
    '!src/modules/users/services/**',
    '!src/modules/users/types/**',
    '!src/providers/toast-provider/**',
    '!src/modules/users/schemas/**',
    '!src/modules/auth/types/**',
    '!src/modules/auth/schemas/**',
    '!src/modules/auth/services/**',
    '!src/modules/categories/services/**',
    '!src/modules/categories/schemas/**',
    '!src/modules/categories/types/**',
    '!src/modules/products/types/**',
    '!src/modules/products/services/**',
    '!src/modules/products/schemas/**'
  ],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
