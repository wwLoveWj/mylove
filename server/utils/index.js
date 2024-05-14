/**
 * 处理数据库中短横线转换小驼峰命名
 * @param {*} obj 数据库中的字段信息
 * @returns
 */
function camelCaseKeys(obj) {
  const result = {};
  for (let key in obj) {
    let newKey =
      key[0].toLowerCase() +
      key.slice(1).replace(/_([a-z])/g, function ($0, $1) {
        return $1.toUpperCase();
      });
    result[newKey] = obj[key];
  }
  return result;
}
module.exports = camelCaseKeys;
