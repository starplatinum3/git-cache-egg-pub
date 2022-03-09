
'use strict';
function isJsonString(str) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true;
    }
  } catch (e) {
  }
  return false;
}

const StringUtil = {
  isJsonString,
  tryStrToJson(str) {
    if (isJsonString(str)) {
      return JSON.parse(str);
    }
    return null;

  },
  deepCopy(src) {
  return   JSON.parse( JSON.stringify(src))



  },
};

module.exports = StringUtil;
