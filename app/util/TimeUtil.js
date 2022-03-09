'use strict';
// 获取格式化的日期
function today() {
  const today = new Date();
  let str = '';
  str += today.getFullYear() + '-';
  const month = today.getMonth() + 1;// 返回值是 0（一月） 到 11（十二月） 之间的一个整数。
  if (month < 10) {
    str += '0';
  }
  str += month + '-';
  const day = today.getDate();// 返回值是 1 ~ 31 之间的一个整数
  if (day < 10) {
    str += '0';
  }
  str += day;
  return str;
}

// https://blog.csdn.net/g229191727/article/details/93463671
// date1和date2是2019-06-18格式
function daysDistance(date1, date2) {
  // parse() 是 Date 的一个静态方法 , 所以应该使用 Date.parse() 来调用，
  // 而不是作为 Date 的实例方法。返回该日期距离 1970/1/1 午夜时间的毫秒数
  date1 = Date.parse(date1);
  date2 = Date.parse(date2);
  // 计算两个日期之间相差的毫秒数的绝对值
  const ms = Math.abs(date2 - date1);
  // 毫秒数除以一天的毫秒数,就得到了天数
  const days = Math.floor(ms / (24 * 3600 * 1000));
  return days;
}

const TimeUtil = {
  today,
  daysDistance,
};

module.exports = TimeUtil;
