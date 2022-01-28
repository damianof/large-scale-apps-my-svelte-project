export default {
  'verbose': true,

  'testEnvironment': 'jsdom',

  'transform': {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        'preprocess': true
      }
    ],
    '^.+\\.test\\.ts$': 'ts-jest'
  },
  
  'moduleFileExtensions': [
    'js', 
    'ts', 
    'svelte'
  ]
}
