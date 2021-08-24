const postcssNormalize = require("postcss-normalize");
const postcssCustomMedia = require('postcss-custom-media');

module.exports = {
  plugins: [
    require("postcss-flexbugs-fixes"),
    require("postcss-preset-env")({
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
    }),
    // Adds PostCSS Normalize as the reset css with default options,
    // so that it honors browserslist config in package.json
    // which in turn let's users customize the target behavior as per their needs.
    postcssNormalize(),
    postcssCustomMedia(),
    require("autoprefixer"),
    require("postcss-px-to-viewport")({
      unitToConvert: "px",
      viewportWidth: 375,
      unitPrecission: 6,
      propList: ["*"],
      viewportUnit: "vw",
      fontViewportUnit: "vw",
      selectorBlacklist: [""],
      minPixelValue: 1,
      mediaQuery: true,
      replace: true,
      exclude: [/node_modules/],
      landscape: false,
    }),
  ],
};
