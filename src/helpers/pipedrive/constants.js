export const PIPEDRIVE_USER = process.env.REACT_APP_PIPEDRIVE_USER_ID;
export const PIPEDRIVE_KEY = process.env.REACT_APP_PIPEDRIVE_KEY;

const MENTOR_PIPELINE = 4;
const MENTORS_DEAL = 0;

const BASE_URL = "https://codeyourfuture.pipedrive.com/v1";
const PIPELINE_URL = "https://api.pipedrive.com/v1/pipelines";
const MENTORS_DEAL_URL = `${PIPELINE_URL}/${MENTOR_PIPELINE}/deals?start=${MENTORS_DEAL}&api_token=${PIPEDRIVE_KEY}`;

export const PIPEDRIVE_API = {
  base: BASE_URL,
  pipeline: PIPELINE_URL,
  mentors_deal: MENTORS_DEAL_URL
};

export const PIPEDRIVE = {
  api: PIPEDRIVE_API,
  key: PIPEDRIVE_KEY,
  user: PIPEDRIVE_USER
};

export const PIPELINES = {
  mentors: MENTOR_PIPELINE
};

export const DEALS = {
  mentors: MENTORS_DEAL
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
  pipeline: MENTOR_PIPELINE,
  deal: MENTORS_DEAL
};
