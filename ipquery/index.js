const path = require("path");
const countryData = require("./countryData.json");

const IP2Region = require("ip2region").default;
const query = new IP2Region({
  ipv4db: path.join(__dirname, "./ip2region.db"),
  ipv6db: path.join(__dirname, "./ipv6wry.db"),
  disableIpv6: true,
});

const countryByName = countryData.reduce((p, c) => {
  p[c.zh] = c;
  return p;
}, {});

/***
 * 根据ip查询地理位置
 * @param ip
 * @returns {city: string, region: string, isp: string, country: Object}
 * 返回格式: {
  country: {
    code: 86,
    en: 'China',
    locale: 'CN',
    zh: '中国',
    lat: 35.86166,
    lng: 104.195397,
    emoji: '🇨🇳'
  },
  province: '北京',
  city: '北京市',
  isp: '联通'
}
 */
function main(ip) {
  const res = query.search(ip) || {};
  res.country = countryByName[res.country];
  return res;
}

module.exports = main;
