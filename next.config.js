module.exports = {
  reactStrictMode: true,
}
// mdのデータをこのサイトで使うための設定
module.exports = {

  webpack: function(config){
    config.module.rules.push({
      test: /\.md$/,
      use:"raw-loader",
    })
    return config
  },
}