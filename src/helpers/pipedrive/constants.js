export const PIPEDRIVE_USER = process.env.REACT_APP_PIPEDRIVE_USER_ID;
export const PIPEDRIVE_KEY = process.env.REACT_APP_PIPEDRIVE_KEY;

const MENTOR_PIPELINE = 4;
const MENTOR_START = 0;

const STUDENT_PIPELINE = 1;
const STUDENT_START = 0;
const STUDENT_DEAL_LIMIT = 50;

const BASE_URL = "https://codeyourfuture.pipedrive.com/v1";
const PIPELINE_URL = "https://api.pipedrive.com/v1/pipelines";

const MENTOR_PIPELINE_URL = `${PIPELINE_URL}/${MENTOR_PIPELINE}/deals?start=${MENTOR_START}&api_token=${PIPEDRIVE_KEY}`;

export const PIPELINES = {
  mentors: MENTOR_PIPELINE
};

export const STUDENT_STATUS = {
  ALL: "All",
  GENERAL_APPLICATION: "General Application",
  EMAIL_SENT: "Email sent",
  INTRO_CALL: "Intro call",
  MOTIVATION_LETTER: "Motivation Letter",
  STARTED_TUTORIALS: "Started Tutorials",
  TUTORIALS_COMPLETED: "Tutorials Completed",
  WEBPAGE_DESIGNED: "Webpage Designed",
  WEBPAGE_ITERATED: "Webpage Iterated",
  WELCOME_CALL: "Welcome Call"
};

export const MENTOR_STATUS = {
  ALL: "All",
  SIGNED_UP: "Signed Up",
  CONTACTED: "Contacted",
  MOTIVATED: "Motivated",
  EMAILED: "Emailed",
  INTRO_CHAT: "Intro Chat",
  ATTENDED_CLASS: "Attended Class",
  POTENTIAL_ORGANISER: "Potential Module Organisers"
};

export const MENTOR_FIELDS = {
  LOCALITY: "7ba8d2a86a0b715c549490dbbc0b675d2a67a58c_locality",
  EMAIL: "ceb1aa9f84815f095047d398900dda19147410f8"
};

export const MENTORS = {
  fields: MENTOR_FIELDS,
  status: MENTOR_STATUS,
  pipeline: MENTOR_PIPELINE
};

export const STUDENTS = {
  status: STUDENT_STATUS
};

export const getMentorStage = stageID => {
  if (stageID === 22) return MENTORS.status.SIGNED_UP;
  if (stageID === 41) return MENTORS.status.CONTACTED;
  if (stageID === 35) return MENTORS.status.MOTIVATED;
  if (stageID === 33) return MENTORS.status.EMAILED;
  if (stageID === 23) return MENTORS.status.INTRO_CHAT;
  if (stageID === 24) return MENTORS.status.ATTENDED_CLASS;
  if (stageID === 25) return MENTORS.status.POTENTIAL_ORGANISER;
};

export const getStudentStage = stageID => {
  if (stageID === 1) return STUDENTS.status.GENERAL_APPLICATION;
  if (stageID === 20) return STUDENTS.status.EMAIL_SENT;
  if (stageID === 19) return STUDENTS.status.INTRO_CALL;
  if (stageID === 2) return STUDENTS.status.MOTIVATION_LETTER;
  if (stageID === 6) return STUDENTS.status.STARTED_TUTORIALS;
  if (stageID === 3) return STUDENTS.status.TUTORIALS_COMPLETED;
  if (stageID === 4) return STUDENTS.status.WEBPAGE_DESIGNED;
  if (stageID === 21) return STUDENTS.status.WEBPAGE_ITERATED;
  if (stageID === 7) return STUDENTS.status.WELCOME_CALL;
};

// const STUDENTS_DEAL_URL = `${BASE_URL}/deals??&limit=${STUDENT_DEAL_LIMIT}&user_id=${PIPEDRIVE_USER}&stage=${getStudentStage(
// STUDENTS.status.GENERAL_APPLICATION
// )}&status=open&api_token=${PIPEDRIVE_KEY}`;

// const STUDENTS_PIPELINE_URL = `${PIPELINE_URL}/${STUDENT_PIPELINE}/deals?start=${STUDENT_START}&api_token=${PIPEDRIVE_KEY}`;
// return fetch(pipedriveBaseUrl + '/deals?&limit=' + dealLimit + '&user_id=' + process.env.PIPEDRIVE_USER_ID + '&stage_id=' + generalApplicationStage + '&status=open&api_token=' + pipedriveKey)
const STUDENTS_PIPELINE_URL = `${BASE_URL}/deals?&limit=500&status=open&api_token=${PIPEDRIVE_KEY}`;

export const PIPEDRIVE_API = {
  base: BASE_URL,
  pipeline: PIPELINE_URL,
  mentor_deal: MENTOR_PIPELINE_URL,
  student_deal: STUDENTS_PIPELINE_URL
};

export const PIPEDRIVE = {
  api: PIPEDRIVE_API,
  key: PIPEDRIVE_KEY,
  user: PIPEDRIVE_USER
};
