// vite.config.js
import { defineConfig } from "file:///D:/vworkspace/zkwq-x/node_modules/.pnpm/vite@4.1.0_@types+node@24.10.1_sass@1.94.2_terser@5.44.1/node_modules/vite/dist/node/index.js";
import { createVuePlugin } from "file:///D:/vworkspace/zkwq-x/node_modules/.pnpm/vite-plugin-vue2@2.0.3_loda_029c4217cb2bd4620fb204ce8dcd74f5/node_modules/vite-plugin-vue2/dist/index.js";
import { transformVueJsx } from "file:///D:/vworkspace/zkwq-x/node_modules/.pnpm/vite-plugin-vue2@2.0.3_loda_029c4217cb2bd4620fb204ce8dcd74f5/node_modules/vite-plugin-vue2/dist/jsxTransform.js";
import { resolve } from "path";
import Inspect from "file:///D:/vworkspace/zkwq-x/node_modules/.pnpm/vite-plugin-inspect@0.7.42__a163a59bd5be5dcf049b691ddde16d2c/node_modules/vite-plugin-inspect/dist/index.mjs";
import { vitePlugin } from "file:///D:/vworkspace/zkwq-x/packages/unplugin-test/dist/index.cjs";
import { ColorChangeUnpluginVite, presetBaseUIDynamic } from "file:///D:/vworkspace/zkwq-x/packages/unplugin-color-change/dist/index.cjs";
import { VersionCheckVite } from "file:///D:/vworkspace/zkwq-x/packages/unplugin-version-check/dist/index.js";
var __vite_injected_original_dirname = "D:\\vworkspace\\zkwq-x\\playground\\component-test";
var baseUiVue2Jsx = () => ({
  name: "base-ui-vue2-jsx",
  transform(code, id) {
    const normalizedId = id.replace(/\\/g, "/");
    const isBaseUiModule = normalizedId.includes("/packages/business/src/components/base/ui/") || normalizedId.includes("/src/components/base/ui/");
    const isVueMainModule = /\.vue($|\?)/.test(normalizedId) && !code.includes("<script");
    const isPlainJsModule = /\.js$/.test(normalizedId);
    const isScriptModule = isPlainJsModule || normalizedId.includes("type=script") || isVueMainModule;
    if (!isBaseUiModule || !isScriptModule || !code.includes("<")) {
      return null;
    }
    return transformVueJsx(code, id);
  }
});
var vite_config_default = defineConfig({
  plugins: [
    createVuePlugin({ jsx: true }),
    baseUiVue2Jsx(),
    vitePlugin(),
    Inspect({
      build: true,
      outputDir: ".vite-inspect"
    }),
    ColorChangeUnpluginVite({
      colors: [presetBaseUIDynamic()]
    }),
    VersionCheckVite()
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
  server: {
    // host: '192.168.0.45',
    // port: 8080,
    proxy: {
      // 接口地址代理
      "/file": {
        target: "https://file.scholarin.cn/",
        // 接口的域名
        secure: true,
        // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        // 如果接口跨域，需要进行这个参数配置
        rewrite: (path) => path.replace(/^\/file/, "/")
      },
      "/hky": {
        target: "http://124.16.154.42:8081/hky",
        // 接口的域名
        secure: true,
        // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        // 如果接口跨域，需要进行这个参数配置
        rewrite: (path) => path.replace(/^\/hky/, "/")
      },
      "/insKnowApi": {
        target: "https://scholarin.cn/insKnowApi/",
        // 接口的域名
        secure: true,
        // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        // 如果接口跨域，需要进行这个参数配置
        rewrite: (path) => path.replace(/^\/insKnowApi/, "/")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2d29ya3NwYWNlXFxcXHprd3EteFxcXFxwbGF5Z3JvdW5kXFxcXGNvbXBvbmVudC10ZXN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2d29ya3NwYWNlXFxcXHprd3EteFxcXFxwbGF5Z3JvdW5kXFxcXGNvbXBvbmVudC10ZXN0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi92d29ya3NwYWNlL3prd3EteC9wbGF5Z3JvdW5kL2NvbXBvbmVudC10ZXN0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7Y3JlYXRlVnVlUGx1Z2lufSBmcm9tICd2aXRlLXBsdWdpbi12dWUyJ1xuaW1wb3J0IHsgdHJhbnNmb3JtVnVlSnN4IH0gZnJvbSAndml0ZS1wbHVnaW4tdnVlMi9kaXN0L2pzeFRyYW5zZm9ybSdcbmltcG9ydCB7cmVzb2x2ZX0gZnJvbSAncGF0aCdcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXG5pbXBvcnQge3ZpdGVQbHVnaW59IGZyb20gJ3VucGx1Z2luLXRlc3QnXG5pbXBvcnQge0NvbG9yQ2hhbmdlVW5wbHVnaW5WaXRlLHByZXNldEJhc2VVSUR5bmFtaWN9IGZyb20gJ0B6a3dxL3VucGx1Z2luLWNvbG9yLWNoYW5nZSdcbmltcG9ydCB7VmVyc2lvbkNoZWNrVml0ZX0gZnJvbSAnQHprd3EvdW5wbHVnaW4tdmVyc2lvbi1jaGVjaydcblxuY29uc3QgYmFzZVVpVnVlMkpzeCA9ICgpID0+ICh7XG4gIG5hbWU6ICdiYXNlLXVpLXZ1ZTItanN4JyxcbiAgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZElkID0gaWQucmVwbGFjZSgvXFxcXC9nLCAnLycpXG4gICAgY29uc3QgaXNCYXNlVWlNb2R1bGUgPSBub3JtYWxpemVkSWQuaW5jbHVkZXMoJy9wYWNrYWdlcy9idXNpbmVzcy9zcmMvY29tcG9uZW50cy9iYXNlL3VpLycpXG4gICAgICB8fCBub3JtYWxpemVkSWQuaW5jbHVkZXMoJy9zcmMvY29tcG9uZW50cy9iYXNlL3VpLycpXG4gICAgY29uc3QgaXNWdWVNYWluTW9kdWxlID0gL1xcLnZ1ZSgkfFxcPykvLnRlc3Qobm9ybWFsaXplZElkKSAmJiAhY29kZS5pbmNsdWRlcygnPHNjcmlwdCcpXG4gICAgY29uc3QgaXNQbGFpbkpzTW9kdWxlID0gL1xcLmpzJC8udGVzdChub3JtYWxpemVkSWQpXG4gICAgY29uc3QgaXNTY3JpcHRNb2R1bGUgPSBpc1BsYWluSnNNb2R1bGUgfHwgbm9ybWFsaXplZElkLmluY2x1ZGVzKCd0eXBlPXNjcmlwdCcpIHx8IGlzVnVlTWFpbk1vZHVsZVxuXG4gICAgaWYgKCFpc0Jhc2VVaU1vZHVsZSB8fCAhaXNTY3JpcHRNb2R1bGUgfHwgIWNvZGUuaW5jbHVkZXMoJzwnKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtVnVlSnN4KGNvZGUsIGlkKVxuICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG5cdFx0Y3JlYXRlVnVlUGx1Z2luKHtqc3g6dHJ1ZX0pLFxuICAgIGJhc2VVaVZ1ZTJKc3goKSxcblx0XHR2aXRlUGx1Z2luKCksXG5cdFx0SW5zcGVjdCh7XG4gICAgICBidWlsZDogdHJ1ZSxcclxuICAgICAgb3V0cHV0RGlyOiAnLnZpdGUtaW5zcGVjdCdcclxuICAgIH0pLFxyXG4gICAgQ29sb3JDaGFuZ2VVbnBsdWdpblZpdGUoe1xyXG4gICAgICBjb2xvcnM6W3ByZXNldEJhc2VVSUR5bmFtaWMoKV1cclxuICAgIH0pLFxyXG4gICAgVmVyc2lvbkNoZWNrVml0ZSgpXHJcblx0XSxcclxuICAvL3ZpdGUuY29uZi50cyBcdTY1ODdcdTRFRjZcdTRFMkRcdTc2ODRcdTg5RTNcdTY3OTBcdTkxNERcdTdGNkVcclxuXHRyZXNvbHZlOiB7XHJcblx0XHQvL1x1NTIyQlx1NTQwRFx1ODlFM1x1Njc5MFx1RkYwQ1x1NjI4QUBcdTRFMEVzcmNcdTc2RUVcdTVGNTVcdTUwNUFcdTY2MjBcdTVDMDRcdTU5MDRcdTc0MDZcclxuXHRcdGFsaWFzOiB7XHJcblx0XHRcdCdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXHJcblx0XHR9LFxyXG5cdFx0Ly9cdTVCRkNcdTUxNjVcdTY1RjZcdTYwRjNcdTg5ODFcdTc3MDFcdTc1NjVcdTc2ODRcdTYyNjlcdTVDNTVcdTU0MERcdTUyMTdcdTg4NjhcclxuXHRcdGV4dGVuc2lvbnM6IFsnLm1qcycsICcuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbicsJy52dWUnXVxyXG5cdH0sXHJcblx0c2VydmVyOiB7XHJcbiAgICAvLyBob3N0OiAnMTkyLjE2OC4wLjQ1JyxcclxuICAgIC8vIHBvcnQ6IDgwODAsXHJcbiAgICBwcm94eToge1xyXG4gICAgICAvLyBcdTYzQTVcdTUzRTNcdTU3MzBcdTU3NDBcdTRFRTNcdTc0MDZcclxuICAgICAgJy9maWxlJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vZmlsZS5zY2hvbGFyaW4uY24vJywgLy8gXHU2M0E1XHU1M0UzXHU3Njg0XHU1N0RGXHU1NDBEXHJcbiAgICAgICAgc2VjdXJlOiB0cnVlLCAvLyBcdTU5ODJcdTY3OUNcdTY2MkZodHRwc1x1NjNBNVx1NTNFM1x1RkYwQ1x1OTcwMFx1ODk4MVx1OTE0RFx1N0Y2RVx1OEZEOVx1NEUyQVx1NTNDMlx1NjU3MFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgLy8gXHU1OTgyXHU2NzlDXHU2M0E1XHU1M0UzXHU4REU4XHU1N0RGXHVGRjBDXHU5NzAwXHU4OTgxXHU4RkRCXHU4ODRDXHU4RkQ5XHU0RTJBXHU1M0MyXHU2NTcwXHU5MTREXHU3RjZFXHJcbiAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC9maWxlLywgJy8nKVxyXG4gICAgICB9LFxyXG4gICAgICAnL2hreSc6IHtcclxuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTI0LjE2LjE1NC40Mjo4MDgxL2hreScsIC8vIFx1NjNBNVx1NTNFM1x1NzY4NFx1NTdERlx1NTQwRFxyXG4gICAgICAgIHNlY3VyZTogdHJ1ZSwgLy8gXHU1OTgyXHU2NzlDXHU2NjJGaHR0cHNcdTYzQTVcdTUzRTNcdUZGMENcdTk3MDBcdTg5ODFcdTkxNERcdTdGNkVcdThGRDlcdTRFMkFcdTUzQzJcdTY1NzBcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vIFx1NTk4Mlx1Njc5Q1x1NjNBNVx1NTNFM1x1OERFOFx1NTdERlx1RkYwQ1x1OTcwMFx1ODk4MVx1OEZEQlx1ODg0Q1x1OEZEOVx1NEUyQVx1NTNDMlx1NjU3MFx1OTE0RFx1N0Y2RVxyXG4gICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvaGt5LywgJy8nKVxyXG4gICAgICB9LFxyXG4gICAgICAnL2luc0tub3dBcGknOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9zY2hvbGFyaW4uY24vaW5zS25vd0FwaS8nLCAvLyBcdTYzQTVcdTUzRTNcdTc2ODRcdTU3REZcdTU0MERcclxuICAgICAgICBzZWN1cmU6IHRydWUsIC8vIFx1NTk4Mlx1Njc5Q1x1NjYyRmh0dHBzXHU2M0E1XHU1M0UzXHVGRjBDXHU5NzAwXHU4OTgxXHU5MTREXHU3RjZFXHU4RkQ5XHU0RTJBXHU1M0MyXHU2NTcwXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvLyBcdTU5ODJcdTY3OUNcdTYzQTVcdTUzRTNcdThERThcdTU3REZcdUZGMENcdTk3MDBcdTg5ODFcdThGREJcdTg4NENcdThGRDlcdTRFMkFcdTUzQzJcdTY1NzBcdTkxNERcdTdGNkVcclxuICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXlxcL2luc0tub3dBcGkvLCAnLycpXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNVLFNBQVMsb0JBQW9CO0FBQ25XLFNBQVEsdUJBQXNCO0FBQzlCLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVEsZUFBYztBQUN0QixPQUFPLGFBQWE7QUFDcEIsU0FBUSxrQkFBaUI7QUFDekIsU0FBUSx5QkFBd0IsMkJBQTBCO0FBQzFELFNBQVEsd0JBQXVCO0FBUC9CLElBQU0sbUNBQW1DO0FBU3pDLElBQU0sZ0JBQWdCLE9BQU87QUFBQSxFQUMzQixNQUFNO0FBQUEsRUFDTixVQUFVLE1BQU0sSUFBSTtBQUNsQixVQUFNLGVBQWUsR0FBRyxRQUFRLE9BQU8sR0FBRztBQUMxQyxVQUFNLGlCQUFpQixhQUFhLFNBQVMsNENBQTRDLEtBQ3BGLGFBQWEsU0FBUywwQkFBMEI7QUFDckQsVUFBTSxrQkFBa0IsY0FBYyxLQUFLLFlBQVksS0FBSyxDQUFDLEtBQUssU0FBUyxTQUFTO0FBQ3BGLFVBQU0sa0JBQWtCLFFBQVEsS0FBSyxZQUFZO0FBQ2pELFVBQU0saUJBQWlCLG1CQUFtQixhQUFhLFNBQVMsYUFBYSxLQUFLO0FBRWxGLFFBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLFNBQVMsR0FBRyxHQUFHO0FBQzdELGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTyxnQkFBZ0IsTUFBTSxFQUFFO0FBQUEsRUFDakM7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNULGdCQUFnQixFQUFDLEtBQUksS0FBSSxDQUFDO0FBQUEsSUFDeEIsY0FBYztBQUFBLElBQ2hCLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELHdCQUF3QjtBQUFBLE1BQ3RCLFFBQU8sQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQy9CLENBQUM7QUFBQSxJQUNELGlCQUFpQjtBQUFBLEVBQ3BCO0FBQUE7QUFBQSxFQUVBLFNBQVM7QUFBQTtBQUFBLElBRVIsT0FBTztBQUFBLE1BQ04sS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUNoQztBQUFBO0FBQUEsSUFFQSxZQUFZLENBQUMsUUFBUSxPQUFPLE9BQU8sUUFBUSxRQUFRLFNBQVEsTUFBTTtBQUFBLEVBQ2xFO0FBQUEsRUFDQSxRQUFRO0FBQUE7QUFBQTtBQUFBLElBR0wsT0FBTztBQUFBO0FBQUEsTUFFTCxTQUFTO0FBQUEsUUFDUCxRQUFRO0FBQUE7QUFBQSxRQUNSLFFBQVE7QUFBQTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsUUFDZCxTQUFTLFVBQVEsS0FBSyxRQUFRLFdBQVcsR0FBRztBQUFBLE1BQzlDO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUE7QUFBQSxRQUNSLFFBQVE7QUFBQTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsUUFDZCxTQUFTLFVBQVEsS0FBSyxRQUFRLFVBQVUsR0FBRztBQUFBLE1BQzdDO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUE7QUFBQSxRQUNSLFFBQVE7QUFBQTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsUUFDZCxTQUFTLFVBQVEsS0FBSyxRQUFRLGlCQUFpQixHQUFHO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
