export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './.babelrc' }]
    },
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '\\.(sass|scss|css)$': 'identity-obj-proxy'
    }
};