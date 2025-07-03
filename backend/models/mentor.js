const mentors = {
  BSIT: [
    {
      id: 1,
      name: "Alice Johnson",
      field: "Network Security",
      experience: "5 years",
    },
    {
      id: 2,
      name: "Bob Smith",
      field: "Cloud Computing",
      experience: "3 years",
    },
    {
      id: 3,
      name: "Charlie Davis",
      field: "Web Development",
      experience: "2 years",
    },
    {
      id: 4,
      name: "Diana Green",
      field: "Hardware Maintenance",
      experience: "2 years",
    },
  ],
  BSDS: [
    {
      id: 5,
      name: "Carol White",
      field: "Machine Learning",
      experience: "1 years",
    },
    {
      id: 6,
      name: "David Brown",
      field: "Big Data Analytics",
      experience: "2years",
    },
    { id: 7, name: "Eve Black", field: "Data Science", experience: "1 years" },
    { id: 8, name: "Frank Green", field: "Data Mining", experience: "2 years" },
  ],
  BSCS: [
    {
      id: 9,
      name: "Eve Black",
      field: "Software Engineering",
      experience: "1 years",
    },
    { id: 10, name: "Frank Green", field: "Algorithms", experience: "2 years" },
    {
      id: 11,
      name: "Grace White",
      field: "Cybersecurity",
      experience: "2 years",
    },
    {
      id: 12,
      name: "Henry Blue",
      field: "Embedded Systems",
      experience: "2 years",
    },
  ],
};

export function getMentorsByDegree(degree) {
  return mentors[degree] || [];
}

export function getAllMentors() {
  return Object.values(mentors).flat();
}
