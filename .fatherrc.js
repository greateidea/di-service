export default {
    entry: 'src/index.tsx',
    doc: {
      themeConfig: { mode: 'dark' },
      base: '/'
    },
    esm: 'rollup',
    cjs: 'rollup',
    umd: {
        name: 'umisg',
        globals: {
            react: "React"
        },
    }
  }