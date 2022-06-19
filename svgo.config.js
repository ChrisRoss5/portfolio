module.exports = {
  multipass: true,
  js2svg: { indent: 2, pretty: true },
  plugins: [
    { name: "preset-default" },
    { name: "removeXMLNS" },
    {
      name: "removeAttrs",
      params: {
        attrs: "preserveAspectRatio",
      },
    },
  ],
};
