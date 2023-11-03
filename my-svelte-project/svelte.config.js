import sveltePreprocess from 'svelte-preprocess'

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      postcss: true
    })
  ],
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) {
      return
    }
    handler(warning)
  }
}
