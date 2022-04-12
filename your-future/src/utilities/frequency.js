export default function frequency(key, data) {
  const dict = {};
  data.map((entry, index) => {
    const x = dict[entry[key]];
    dict[entry[key]] = x != null ? x + 1 : 0;
  });

  const list = [];
  for (var k in dict) {
    list.push({ country: k, count: dict[k] });
  }
  return list;
}
