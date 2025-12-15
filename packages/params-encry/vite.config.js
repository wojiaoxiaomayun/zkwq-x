import path from 'node:path'
import { defineConfig } from 'vite'
import copy from 'rollup-plugin-copy' //引入插件
export default defineConfig({
  plugins: [copy({
    verbose:true,
    hook:'closeBundle',
    targets:[
      { src: 'src/index.d.ts', dest: 'dist/' }
    ]
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/toolsApi/': {
        target: 'http://localhost:8099',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/toolsApi/, ''),
      },
      '/hky/': {
        target: 'https://scholarin.cn/hky/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/hky/, ''),
      },
    },
  },
  build: {
    target:'ES2015',
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'ParamsEncry',
      // the proper extensions will be added
      fileName: 'index',
    }
  }
})
