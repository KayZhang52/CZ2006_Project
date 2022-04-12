const results = [
  {
    institution: "Harvard University",
    location: "USA",
    score: 100.0,
  },
  {
    institution: "Massachusetts Institute of Technology",
    location: "USA",
    score: 96.7,
  },
  {
    institution: "Stanford University",
    location: "USA",
    score: 95.2,
  },
  {
    institution: "University of Cambridge",
    location: "United Kingdom",
    score: 94.1,
  },
  {
    institution: "University of Oxford",
    location: "United Kingdom",
    score: 93.3,
  },
  {
    institution: "Columbia University",
    location: "USA",
    score: 92.6,
  },
  {
    institution: "Princeton University",
    location: "USA",
    score: 92.0,
  },
  {
    institution: "University of California, Berkeley",
    location: "USA",
    score: 91.6,
  },
  {
    institution: "University of Pennsylvania",
    location: "USA",
    score: 91.1,
  },
  {
    institution: "University of Chicago",
    location: "USA",
    score: 90.7,
  },
];

function frequency(key, data) {
  const dict = {};
  data.map((entry, index) => {
    const x = dict[entry[key]];
    dict[entry[key]] = x != null ? x + 1 : 0;
  });
  return dict;
}

console.log(frequency("location", results));
