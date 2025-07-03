import { getMentorsByDegree, getAllMentors } from "../models/mentor.js";

export function listMentors(req, res) {
  const { degree, search } = req.query;
  let mentorList = degree ? getMentorsByDegree(degree) : getAllMentors();
  if (search) {
    mentorList = mentorList.filter((m) =>
      m.field.toLowerCase().includes(search.toLowerCase())
    );
  }
  res.json(mentorList);
}

export function requestMentorship(req, res) {
  const { mentorId } = req.body;
  // In a real app, store the request in DB
  res.json({
    message: "Mentorship request sent",
    mentorId,
    menteeId: req.user.id,
  });
}
