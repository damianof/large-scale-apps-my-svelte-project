export default {
  "preset": "ts-jest",
  "testEnvironment": "jsdom",
  "verbose": true,

  "globals": {
    "ts-jest": {
      isolatedModules: true,
    },
  },

  "transform": {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        "preprocess": true
      }
    ],
    "^.+\\.test\\.ts$": "ts-jest"
  },

  "transformIgnorePatterns": [
    "node_modules/(?!variables/.*)"
  ],
  
  "moduleFileExtensions": [
    "js", 
    "ts", 
    "svelte"
  ]
}
