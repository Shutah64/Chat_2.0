const bcrypt = require("bcrypt");
const helper_initCustomFunctions = () => {
  Array.prototype.custom_checkProp = (arr, prop, value, type) => {
    if (!Array.isArray(prop)) Array(prop);
    if (!Array.isArray(value)) Array(value);
    for (let i = 0; i < arr.length; i++) {
      const some = [];
      let passed;
      for (let j = 0; j < prop.length; j++) {
        if (arr[i][prop[j]] == value[j]) passed = true;
        else passed = false;
        some.push(passed);
      }
      if (type == "all" && some.includes(false)) return null;
      else if (passed) return arr[i];
    }
    return null;
  };
  Array.prototype.custom_filterObj = (arr, prop, value) => {
    const filtered = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][prop] == value) filtered.push(arr[i]);
    }
    return filtered;
  };

  String.prototype.custom_encrypt = (str, rounds) => {
    let saltRounds;
    if (rounds) saltRounds = rounds;
    else saltRounds = 10;
    const hash = bcrypt.hashSync(str, saltRounds);
    return hash;
  };
  String.prototype.custom_checkEncrypt = (str, hash) => {
    return bcrypt.compareSync(str, hash);
  };
  Array.prototype.custom_sortObj = (arr, prop, value, type) => {};
  Array.prototype.custom_sortArr = (arr, prop, value, type) => {};
  Array.prototype.custom_removeByProp = (arr, prop, value, type) => {};
  Array.prototype.custom_addByProp = (arr, prop, value, type) => {};
  Array.prototype.custom_checkDuplicateArr = (arr, prop, value, type) => {};
  Array.prototype.custom_checkDuplicateObj = (arr, prop, value, type) => {};
  Array.prototype.custom_removeDuplicatesArr = (arr, prop, value, type) => {};
  Array.prototype.custom_removeDuplicatesObj = (arr, prop, value, type) => {};
};

module.exports = { helper_initCustomFunctions };
