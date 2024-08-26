import { defineConfig } from 'vite'
import {createVuePlugin} from 'vite-plugin-vue2'
import {resolve} from 'path'
import Inspect from 'vite-plugin-inspect'
import {vitePlugin} from 'unplugin-test'
import {ColorChangeUnpluginVite,presetBaseUIDynamic} from '@zkwq/unplugin-color-change'
import {VersionCheckVite} from '@zkwq/unplugin-version-check'
export default defineConfig({
  plugins: [
		createVuePlugin({jsx:true}),
		vitePlugin(),
		Inspect({
      build: true,
      outputDir: '.vite-inspect'
    }),
    ColorChangeUnpluginVite({
      colors:[presetBaseUIDynamic()]
    }),
    VersionCheckVite()
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
	server: {
    // host: '192.168.0.45',
    // port: 8080,
    proxy: {
      // 接口地址代理
      '/file': {
        target: 'https://file.scholarin.cn/', // 接口的域名
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: path => path.replace(/^\/file/, '/')
      },
      '/hky': {
        target: 'http://124.16.154.42:8081/hky', // 接口的域名
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: path => path.replace(/^\/hky/, '/')
      },
      '/insKnowApi': {
        target: 'https://scholarin.cn/insKnowApi/', // 接口的域名
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: path => path.replace(/^\/insKnowApi/, '/')
      },
    }
  }
})
