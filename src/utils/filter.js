import Vue from "vue";
import {isEmpty} from "@/utils/common";

const formatTime = require('silly-datetime');

/**
 * @description 过滤时间
 * @return YYYY-MM-DD
 **/
Vue.filter("formatDate", function (time) {
  if (!time) return '';
  return formatTime.format(time, 'YYYY-MM-DD');
});

/**
 * @description 过滤时间
 * @return YYYY-MM-DD hh:mm:ss
 **/
Vue.filter("formatDateTime", function (time) {
  if (!time) return '';
  return formatTime.format(time, 'YYYY-MM-DD HH:mm:ss');
});

/**
 * @description 对象获得名称
 * @return {String}
 **/
Vue.filter("formatObj", function (obj, key = 'name') {
  if (isEmpty(obj)) return '';
  if (obj.hasOwnProperty(key)) {
    return obj[key];
  } else {
    return ''
  }
});

/**
 * @description 数组获得名称
 * @return {String}
 **/
Vue.filter("formatArray", function (array, key = 'name') {
  if (isEmpty(array)) return '';
  let str = '';
  array.forEach(item => {
    if (!isEmpty(item) && item.hasOwnProperty(key))
      str += `${item[key]} / `
  });
  str = str.replace(/[\s][/][\s]$/, '');
  return str
});