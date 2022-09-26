export default class {
  /**
   * sort array by date
   * @param {array} obj - arrayto sort
   * @param {string} key - key name to use to sort array
   * @param {string} type - string to detect sort type [asc/desc]
   * @return {array}
   */
  sortArrayByDate({ obj = [], key = "date", type = "desc" }) {
    if (obj.length === 0) throw new Error("Array is required");
    const types = (a, b) => {
      return {
        desc: new Date(b[key]) - new Date(a[key]),
        asc: new Date(a[key]) - new Date(b[key]),
      };
    };
    return obj.sort((prev, next) => types(prev, next)[type]);
  }

  /**
   * get different between 2 dates (one is present day)
   * @param {string} date - message date
   * @return {string}
   */
  getTimeBetweenDates({ date = null }) {
    if (!date) throw new Error("Date is required");
    const start = new Date();
    const end = new Date(date);
    const diff = (start.getTime() - end.getTime()) / 1000;

    /**
     * transform different between 2 dates in day/hours/minutes format
     * @param {number} seconds - different value
     * @returns {string}
     */
    const transform = ({ seconds = 0 }) => {
      if (seconds === 0) return `${seconds}s`;
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      return ` ${readableFormat({
        times: [
          { time: days, label: "d" },
          { time: hours, label: "h" },
        ],
        current: { time: minutes, label: "m" },
      })}`;
    };

    /**
     * make day/hours/minutes format in readable string
     * @param {array} times - previous times to compare
     * @param {object} current - current time to transform to readable view
     * @returns {string}
     */
    const readableFormat = ({ times = [], current = {} }) => {
      if (times.length === 0) return current.time > 0 ? `${current.time}${current.label}` : "";
      const compareTimes = times.every((node) => node.time === 0);
      return compareTimes
        ? `${current.time}${current.label}`
        : `${times.map((node) => (node.time > 0 ? `${node.time}${node.label}` : null)).join(" ")} ${current.time}${
            current.label
          }`;
    };

    return transform({ seconds: diff }).trim();
  }
}
