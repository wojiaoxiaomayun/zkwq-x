// vite.config.js
import { defineConfig } from "file:///D:/vworkspace/zkwq-x/node_modules/.pnpm/vite@4.1.0_sass@1.58.3/node_modules/vite/dist/node/index.js";
import { createVuePlugin } from "file:///D:/vworkspace/zkwq-x/node_modules/.pnpm/vite-plugin-vue2@2.0.3_gixwnffxxnaeg4osqqmfg3xyny/node_modules/vite-plugin-vue2/dist/index.js";
import { resolve } from "path";
import copy from "file:///D:/vworkspace/zkwq-x/node_modules/.pnpm/rollup-plugin-copy@3.4.0/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
import { SplitStylePluginVite } from "file:///D:/vworkspace/zkwq-x/packages/unplugin-split-style/dist/index.cjs";
import { MinifyPluginVite } from "file:///D:/vworkspace/zkwq-x/packages/unplugin-minify/dist/index.cjs";
var __vite_injected_original_dirname = "D:\\vworkspace\\zkwq-x\\packages\\business";
var vite_config_default = defineConfig({
  plugins: [
    // dts(),
    createVuePlugin({ jsx: true }),
    copy({
      verbose: true,
      hook: "closeBundle",
      targets: [
        { src: "src/static/", dest: "dist/" },
        { src: "src/components/base/ui/style/var.scss", dest: "dist/" },
        { src: "src/components/base/ui/style/", dest: "dist/scss/baseUI/" },
        { src: "src/style/reset.scss", dest: "dist/scss/" },
        { src: "src/components/base/ui/locale/lang/", dest: "dist/locale/" }
      ]
    }),
    SplitStylePluginVite({
      pathMapping: {
        "@/src/style/index.scss": "index"
      }
    }),
    MinifyPluginVite()
  ],
  //vite.conf.ts 文件中的解析配置
  resolve: {
    //别名解析，把@与src目录做映射处理
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    },
    //导入时想要省略的扩展名列表
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  },
  build: {
    target: "ES2015",
    cssCodeSplit: true,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.js"),
      name: "Business",
      // the proper extensions will be added
      fileName: "index"
    },
    assetsDir: "dist/static",
    rollupOptions: {
      external: ["vue", "axios", "crypto-js", "wangeditor", "qs"],
      output: {
        globals: {
          vue: "Vue",
          axios: "Axios",
          "crypto-js": "CryptoJS",
          wangeditor: "WangEditor",
          qs: "QS"
        }
      }
    }
  },
  server: {
    proxy: {
      "/hky": {
        target: "https://scholarin.cn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hky/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2d29ya3NwYWNlXFxcXHprd3EteFxcXFxwYWNrYWdlc1xcXFxidXNpbmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdndvcmtzcGFjZVxcXFx6a3dxLXhcXFxccGFja2FnZXNcXFxcYnVzaW5lc3NcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Z3b3Jrc3BhY2Uvemt3cS14L3BhY2thZ2VzL2J1c2luZXNzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHtjcmVhdGVWdWVQbHVnaW59IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZTInXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgY29weSBmcm9tICdyb2xsdXAtcGx1Z2luLWNvcHknIC8vXHU1RjE1XHU1MTY1XHU2M0QyXHU0RUY2XHJcbmltcG9ydCB7U3BsaXRTdHlsZVBsdWdpblZpdGV9IGZyb20gJ0B6a3dxL3VucGx1Z2luLXNwbGl0LXN0eWxlJ1xyXG5pbXBvcnQge01pbmlmeVBsdWdpblZpdGV9IGZyb20gJ0B6a3dxL3VucGx1Z2luLW1pbmlmeSdcclxuLy8gaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIC8vIGR0cygpLFxyXG4gICAgY3JlYXRlVnVlUGx1Z2luKHtqc3g6dHJ1ZX0pLFxyXG4gICAgY29weSh7XHJcbiAgICAgIHZlcmJvc2U6dHJ1ZSxcclxuICAgICAgaG9vazonY2xvc2VCdW5kbGUnLFxyXG4gICAgICB0YXJnZXRzOltcclxuICAgICAgICB7IHNyYzogJ3NyYy9zdGF0aWMvJywgZGVzdDogJ2Rpc3QvJyB9LFxyXG4gICAgICAgIHsgc3JjOiAnc3JjL2NvbXBvbmVudHMvYmFzZS91aS9zdHlsZS92YXIuc2NzcycsIGRlc3Q6ICdkaXN0Lyd9LFxyXG4gICAgICAgIHsgc3JjOiAnc3JjL2NvbXBvbmVudHMvYmFzZS91aS9zdHlsZS8nLCBkZXN0OiAnZGlzdC9zY3NzL2Jhc2VVSS8nfSxcclxuICAgICAgICB7IHNyYzogJ3NyYy9zdHlsZS9yZXNldC5zY3NzJywgZGVzdDogJ2Rpc3Qvc2Nzcy8nfSxcclxuICAgICAgICB7IHNyYzogJ3NyYy9jb21wb25lbnRzL2Jhc2UvdWkvbG9jYWxlL2xhbmcvJywgZGVzdDogJ2Rpc3QvbG9jYWxlLyd9XHJcbiAgICAgIF1cclxuICAgIH0pLFxyXG4gICAgU3BsaXRTdHlsZVBsdWdpblZpdGUoe1xyXG4gICAgICBwYXRoTWFwcGluZzp7XHJcbiAgICAgICAgJ0Avc3JjL3N0eWxlL2luZGV4LnNjc3MnOidpbmRleCdcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgICBNaW5pZnlQbHVnaW5WaXRlKClcclxuICBdLFxyXG4gIC8vdml0ZS5jb25mLnRzIFx1NjU4N1x1NEVGNlx1NEUyRFx1NzY4NFx1ODlFM1x1Njc5MFx1OTE0RFx1N0Y2RVxyXG5cdHJlc29sdmU6IHtcclxuXHRcdC8vXHU1MjJCXHU1NDBEXHU4OUUzXHU2NzkwXHVGRjBDXHU2MjhBQFx1NEUwRXNyY1x1NzZFRVx1NUY1NVx1NTA1QVx1NjYyMFx1NUMwNFx1NTkwNFx1NzQwNlxyXG5cdFx0YWxpYXM6IHtcclxuXHRcdFx0J0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcclxuXHRcdH0sXHJcblx0XHQvL1x1NUJGQ1x1NTE2NVx1NjVGNlx1NjBGM1x1ODk4MVx1NzcwMVx1NzU2NVx1NzY4NFx1NjI2OVx1NUM1NVx1NTQwRFx1NTIxN1x1ODg2OFxyXG5cdFx0ZXh0ZW5zaW9uczogWycubWpzJywgJy5qcycsICcudHMnLCAnLmpzeCcsICcudHN4JywgJy5qc29uJywnLnZ1ZSddXHJcblx0fSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OidFUzIwMTUnLFxyXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC5qcycpLFxyXG4gICAgICBuYW1lOiAnQnVzaW5lc3MnLFxyXG4gICAgICAvLyB0aGUgcHJvcGVyIGV4dGVuc2lvbnMgd2lsbCBiZSBhZGRlZFxyXG4gICAgICBmaWxlTmFtZTogJ2luZGV4JyxcclxuICAgIH0sXHJcbiAgICBhc3NldHNEaXI6IFwiZGlzdC9zdGF0aWNcIixcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgZXh0ZXJuYWw6IFsndnVlJywnYXhpb3MnLCdjcnlwdG8tanMnLCd3YW5nZWRpdG9yJywncXMnXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgdnVlOiAnVnVlJyxcclxuICAgICAgICAgIGF4aW9zOidBeGlvcycsXHJcbiAgICAgICAgICAnY3J5cHRvLWpzJzonQ3J5cHRvSlMnLFxyXG4gICAgICAgICAgd2FuZ2VkaXRvcjonV2FuZ0VkaXRvcicsXHJcbiAgICAgICAgICBxczonUVMnXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXJ2ZXI6e1xyXG4gICAgcHJveHk6e1xyXG4gICAgICAnL2hreSc6e1xyXG4gICAgICAgIHRhcmdldDonaHR0cHM6Ly9zY2hvbGFyaW4uY24nLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjp0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9oa3kvLCAnJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UyxTQUFTLG9CQUFvQjtBQUMzVSxTQUFRLHVCQUFzQjtBQUM5QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVEsNEJBQTJCO0FBQ25DLFNBQVEsd0JBQXVCO0FBTC9CLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQTtBQUFBLElBRVAsZ0JBQWdCLEVBQUMsS0FBSSxLQUFJLENBQUM7QUFBQSxJQUMxQixLQUFLO0FBQUEsTUFDSCxTQUFRO0FBQUEsTUFDUixNQUFLO0FBQUEsTUFDTCxTQUFRO0FBQUEsUUFDTixFQUFFLEtBQUssZUFBZSxNQUFNLFFBQVE7QUFBQSxRQUNwQyxFQUFFLEtBQUsseUNBQXlDLE1BQU0sUUFBTztBQUFBLFFBQzdELEVBQUUsS0FBSyxpQ0FBaUMsTUFBTSxvQkFBbUI7QUFBQSxRQUNqRSxFQUFFLEtBQUssd0JBQXdCLE1BQU0sYUFBWTtBQUFBLFFBQ2pELEVBQUUsS0FBSyx1Q0FBdUMsTUFBTSxlQUFjO0FBQUEsTUFDcEU7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELHFCQUFxQjtBQUFBLE1BQ25CLGFBQVk7QUFBQSxRQUNWLDBCQUF5QjtBQUFBLE1BQzNCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxpQkFBaUI7QUFBQSxFQUNuQjtBQUFBO0FBQUEsRUFFRCxTQUFTO0FBQUE7QUFBQSxJQUVSLE9BQU87QUFBQSxNQUNOLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDaEM7QUFBQTtBQUFBLElBRUEsWUFBWSxDQUFDLFFBQVEsT0FBTyxPQUFPLFFBQVEsUUFBUSxTQUFRLE1BQU07QUFBQSxFQUNsRTtBQUFBLEVBQ0MsT0FBTztBQUFBLElBQ0wsUUFBTztBQUFBLElBQ1AsY0FBYztBQUFBLElBQ2QsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUE7QUFBQSxNQUVOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsT0FBTSxTQUFRLGFBQVksY0FBYSxJQUFJO0FBQUEsTUFDdEQsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFVBQ0wsT0FBTTtBQUFBLFVBQ04sYUFBWTtBQUFBLFVBQ1osWUFBVztBQUFBLFVBQ1gsSUFBRztBQUFBLFFBQ0w7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQU87QUFBQSxJQUNMLE9BQU07QUFBQSxNQUNKLFFBQU87QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLGNBQWE7QUFBQSxRQUNiLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
