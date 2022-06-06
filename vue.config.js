/**
 * https://cli.vuejs.org/config/
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/global.scss";
        `,
      },
    },
  },
  chainWebpack: (config) =>
    config.plugin("html").tap((args) => {
      args[0].title = "Kristijan Rosandić";
      return args;
    }),
};
