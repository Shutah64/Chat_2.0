const bcrypt = require("bcrypt");
const helper_initCustomFunctions = () => {
  Array.prototype.custom_indexOfObj=(arr, prop, value)=>{
    let index = []
    for(let i = 0; i<arr.length; i++){
      if(arr[i][prop] == value) index.push(i)
    }
    return index.length == 1 ?  index[0] : index.length ? index : false
  }
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
      if (type == "all" && !some.includes(false)) return arr[i]
      else if (type !='all' && passed) return arr[i];
    }
    return null;
  };
  Array.prototype.custom_filterObj = (arr, prop, value, type, sub) => {
    if(!Array.isArray(value)) value = Array(value)
    const filtered = [];
    for (let i = 0; i < arr.length; i++) {
      const passed = [];
      const res = []
      for(let j=0; j<value.length; j++){
        if(sub){
          const checker = arr[i][prop].custom_filterObj(arr[i][prop], sub, value[j], type)
         if(checker != null) passed.push(true)
         else passed.push(false)
        }else{
          if(!Array.isArray(arr[i][prop])){
            if (Array(arr[i][prop]).includes(value[j])) passed.push(true)
            else passed.push(false)
          } else { 
            if (arr[i][prop].includes(value[j])) passed.push(true)
            else passed.push(false)
          }
        }
      }
      if(type == 'all' && !passed.includes(false)) filtered.push(arr[i])
       else if((!type || type == 'some') && passed.includes(true)) filtered.push(arr[i])
    }
    return filtered.length ? filtered : null;
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
