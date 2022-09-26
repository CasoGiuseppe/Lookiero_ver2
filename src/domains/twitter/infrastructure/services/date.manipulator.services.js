export default class {
  /**
   * sort array by date
   * @param {array} obj - arrayto sort
   * @param {string} key - key name to use to sort array
   * @param {string} type - string to detect sort type [asc/desc]
   * @return {array}
   */
  sortArrayByDate({ obj = [], key = "date", type = "desc" }) {
    const types = (a, b) => {
      return {
        desc: new Date(b[key]) - new Date(a[key]),
        asc: new Date(a[key]) - new Date(b[key]),
      };
    };
    return obj.sort((prev, next) => types(prev, next)[type]);
  }
}
