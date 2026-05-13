import { defineConfig } from 'vite'
import {createVuePlugin} from 'vite-plugin-vue2'
import { transformVueJsx } from 'vite-plugin-vue2/dist/jsxTransform'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy' //引入插件
import {SplitStylePluginVite} from '@zkwq/unplugin-split-style'
import {MinifyPluginVite} from '@zkwq/unplugin-minify'
// import dts from 'vite-plugin-dts'

const baseUiVue2Jsx = () => ({
  name: 'base-ui-vue2-jsx',
  transform(code, id) {
    const normalizedId = id.replace(/\\/g, '/')
    const isBaseUiModule = normalizedId.includes('/src/components/base/ui/')
    const isVueMainModule = /\.vue($|\?)/.test(normalizedId) && !code.includes('<script')
    const isPlainJsModule = /\.js$/.test(normalizedId)
    const isScriptModule = isPlainJsModule || normalizedId.includes('type=script') || isVueMainModule

    if (!isBaseUiModule || !isScriptModule || !code.includes('<')) {
      return null
    }

    return transformVueJsx(code, id)
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // dts(),
    createVuePlugin({jsx:true}),
    // baseUiVue2Jsx(),
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
      // entry: {
      //   index:resolve(__dirname, 'src/index.js'),
      //   baseui:resolve(__dirname, 'src/baseui.js'),
      //   'my-components':resolve(__dirname, 'src/my-components.js'),
      //   'my-functions':resolve(__dirname, 'src/my-functions.js')
      // },
      entry:resolve(__dirname, 'src/index.js'),
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
  },
  server:{
    proxy:{
      '/hky':{
        target:'https://scholarin.cn',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/hky/, '')
      }
    }
  }
})
