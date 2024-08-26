import { defineConfig } from 'vite'
import {createVuePlugin} from 'vite-plugin-vue2'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy' //引入插件
import {SplitStylePluginVite} from '@zkwq/unplugin-split-style'
import {MinifyPluginVite} from '@zkwq/unplugin-minify'
// import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // dts(),
    createVuePlugin({jsx:true}),
    copy({
      verbose:true,
      hook:'closeBundle',
      targets:[
        { src: 'src/static/', dest: 'dist/' },
        { src: 'src/components/base/ui/style/var.scss', dest: 'dist/'},
        { src: 'src/components/base/ui/style/', dest: 'dist/scss/baseUI/'},
        { src: 'src/style/reset.scss', dest: 'dist/scss/'},
        { src: 'src/components/base/ui/locale/lang/', dest: 'dist/locale/'}
      ]
    }),
    SplitStylePluginVite({
      pathMapping:{
        '@/src/style/index.scss':'index'
      }
    }),
    MinifyPluginVite()
  ],
  //vite.conf.ts 文件中的解析配置
	resolve: {
		//别名解析，把@与src目录做映射处理
		alias: {
			'@': resolve(__dirname, './src')
		},
		//导入时想要省略的扩展名列表
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json','.vue']
	},
  build: {
    target:'ES2015',
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Business',
      // the proper extensions will be added
      fileName: 'index',
    },
    assetsDir: "dist/static",
    rollupOptions: {
      external: ['vue','axios','crypto-js','wangeditor','qs'],
      output: {
        globals: {
          vue: 'Vue',
          axios:'Axios',
          'crypto-js':'CryptoJS',
          wangeditor:'WangEditor',
          qs:'QS'
        }
      }
    }
  }
})
