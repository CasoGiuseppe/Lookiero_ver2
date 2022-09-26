export const sortArrayByDate = ({ obj = [], key = "date", type = "asc" }) => {
  const types = (a, b) => {
    return {
      desc: new Date(b[key]) - new Date(a[key]),
      asc: new Date(a[key]) - new Date(b[key]),
    };
  };
  return obj.sort((prev, next) => types(prev, next)[type]);
};
