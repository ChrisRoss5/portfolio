/**
 * https://cli.vuejs.org/config/
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/_variables.scss";
          @import "@/styles/global.scss";
          @import "@/styles/media.scss";
        `,
      },
    },
  },
  chainWebpack: (config) =>
    config.plugin("html").tap((args) => {
      args[0].title = "KristijanRoss";
      return args;
    }),
};
