import axios from "axios";

const url = process.env.REACT_APP_DATABASE_URL;

export const fetchStatistic = async (uid) => {
  const res = await axios.get(`${url}/users/${uid}/statistic.json`);
  const statistic = Object.keys(res.data).map((key) => {
    return {
      ...res.data[key],
      // data: new Date(res.data.data).toLocaleDateString(),
      id: key,
    };
  });
  const data = [];

  for (let elem of statistic) {
    if (!data.find((e) => e.data === elem.data)) {
      if (!elem.add) {
        data.push({ ...elem, add: 0 });
      }
      if (!elem.reduce) {
        data.push({ ...elem, reduce: 0 });
      }
    } else {
      const index = data.findIndex((e) => e.data === elem.data);
      if (elem.add) {
        data[index].add += Number(elem.add);
      }
      if (elem.reduce) {
        data[index].reduce += Number(elem.reduce);
      }
    }
  }

  return data;
};
