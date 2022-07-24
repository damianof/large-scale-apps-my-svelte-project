import * as fs from 'fs'
import { join } from 'path'
import { emitDts } from 'svelte2tsx'

(async () => {

  const cwd = process.cwd()
  //const svelteShimsPath = require.resolve(join(cwd, 'svelte2tsx-shims.d.ts')),
  const svelteShimsPath = join(cwd, 'svelte2tsx-shims.d.ts')
  //console.log('svelteShimsPath', svelteShimsPath)

  const config = fs.existsSync(join(cwd, 'config.json'))
    ? JSON.parse(fs.readFileSync(join(cwd, 'config.json'), 'utf-8'))
    : {
      libRoot: 'src/'
    };

  await emitDts({
    declarationDir: 'dist/',
    svelteShimsPath,
    ...config,
    libRoot: config.libRoot ? join(cwd, config.libRoot) : cwd
  })

})()
