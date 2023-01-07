module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json',
            diagnostics: false,
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};