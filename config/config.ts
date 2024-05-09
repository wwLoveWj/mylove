import { defineConfig } from "umi";
import theme from "./theme";
import { routes } from "./router";
import Package from "../package.json";

const PROJECT_CONFIG = {
  NAME: Package.name,
};
export default defineConfig({
  history: { type: "hash" },
  // initialState: {},
  // model: {}, // 使用useModel需要这个配置
  routes,
  // 配置别名，对引用路径进行映射。
  alias: {
    "@utils": "/src/utils",
    "@assets": "/src/assets",
  },
  plugins: ["@umijs/plugins/dist/locale"],
  locale: {},
  theme, //如果想要定制不同主题，可通过theme配置主题样式变量，变量为less变量

  chainWebpack(memo /* ,  { webpack } */) {
    // 内置的 svg Rule 添加 exclude
    memo.module
      .rule("svg")
      .exclude.add(/iconsvg/)
      .end();
    // 添加 svg-sprite-loader Rule
    memo.module
      .rule("svg-sprite-loader")
      .test(/.svg$/)
      .include.add(/iconsvg/)
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader");
    // 添加 svgo Rule
    memo.module
      .rule("svgo")
      .test(/.svg$/)
      .include.add(/iconsvg/)
      .end()
      .use("svgo-loader")
      .loader("svgo-loader")
      .options({
        // externalConfig 配置特殊不是相对路径，起始路径是根目录
        externalConfig: "./src/assets/iconsvg/svgo.yml",
      });
  },
});
