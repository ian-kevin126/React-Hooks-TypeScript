/**
 * 判断一个值是否为假值
 * @param value
 * @returns {boolean}
 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

/**
 * isFalsy可能会删掉值为false的属性，有时候这不是我们希望看到的
 */
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
/**
 * 清理对象的空值（falsy）
 * @param obj
 */
// TypeScript里面的object跟js里面的不太一样，ts里面的写成如下的键值对形式{ [key: string]: unknown }更为准确
export const cleanObject = (obj: { [key: string]: unknown }) => {
  // 由于js中函数参数是引用传递的，所以为了不污染我们传入的对象本身，我们需要做一次拷贝，然后返回处理改过后的新对象。
  const _object = { ...obj };
  Object.keys(_object).forEach((key) => {
    if (isVoid(_object[key])) {
      delete _object[key];
    }
  });
  return _object;
};
