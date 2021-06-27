/**
 * 判断一个值是否为假值
 * @param value
 * @returns {boolean}
 */
export const isFalsy = (value) => (value === 0 ? false : !value);

/**
 * 清理对象的空值（falsy）
 * @param obj
 */
export const cleanObject = (obj) => {
  // 由于js中函数参数是引用传递的，所以为了不污染我们传入的对象本身，我们需要做一次拷贝，然后返回处理改过后的新对象。
  const _object = { ...obj };
  Object.keys(_object).forEach((key) => {
    if (isFalsy(_object[key])) {
      delete _object[key];
    }
  });
  return _object;
};
