// next.config.js
module.exports = {
  images: {
    domains: ['api.pinbus.vn', '203.205.6.13']
  },
  env: {
    API_URL: process.env.API_URL,
    CLIENT_API: process.env.CLIENT_API,
    PIXEL_ID: process.env.PIXEL_ID,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    AT_CAMPAIGN_ID: process.env.AT_CAMPAIGN_ID,
    MERCHANTS_ENDPOINT: process.env.MERCHANTS_ENDPOINT,
  }
}
