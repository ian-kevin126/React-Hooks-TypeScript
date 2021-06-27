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
  // 由于js中函数参数是引用传递的，所以为了不改变我们传入的对象本身，我们需要做一次拷贝
  const _object = { ...obj };
  Object.keys(_object).forEach((key) => {
    const value = _object[key];
    if (isFalsy(value)) {
      delete _object[key];
    }
  });
  return _object;
};
