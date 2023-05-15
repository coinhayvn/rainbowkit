/* eslint-disable no-console, import/no-extraneous-dependencies */
import * as esbuild from 'esbuild';

const isWatching = process.argv.includes('--watch');

try {
  const context = await esbuild.context({
    bundle: true,
    entryPoints: ['src/index.ts'],
    format: 'esm',
    outdir: 'dist',
    plugins: [
      {
        name: 'make-all-packages-external',
        setup(build) {
          let filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
          build.onResolve({ filter }, args => ({
            external: true,
            path: args.path,
          }));
        },
      },
    ],
  });

  await context.rebuild();

  if (isWatching) {
    await context.watch({
      onEnd(error, result) {
        if (error) console.error('watch build failed:', error);
        else console.log('watch build succeeded:', result);
      },
    });
    console.log('watching...');
  } else {
    context.dispose();
  }
} catch (e) {
  process.exit(1);
}