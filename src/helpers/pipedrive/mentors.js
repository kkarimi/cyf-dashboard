import { cohorts, getCity } from "../cyf";

// import { moveDeal } from "./index";
// import { sendEmail } from "../email";

import { PIPEDRIVE, MENTORS } from "./constants";

const getStage = stageID => {
  if (stageID === 22) return MENTORS.status.SIGNED_UP;
  if (stageID === 41) return MENTORS.status.CONTACTED;
  if (stageID === 35) return MENTORS.status.MOTIVATED;
  if (stageID === 33) return MENTORS.status.EMAILED;
  if (stageID === 23) return MENTORS.status.INTRO_CHAT;
  if (stageID === 24) return MENTORS.status.ATTENDED_CLASS;
  if (stageID === 25) return MENTORS.status.POTENTIAL_ORGANISER;
};

const removeNewLine = name => {
  if (name) return name.replace(/(\r\n|\n|\r)/gm, "");
};

const reshape = deals => {
  return deals.map(deal => {
    let { pipeline_id, person_name, owner_name } = deal;

    pipeline_id = pipeline_id === MENTORS.pipeline ? "mentor" : "";
    person_name = removeNewLine(person_name);

    const stage = getStage(deal.stage_id);

    let locality_field = deal[MENTORS.fields.LOCALITY];
    let mentor_locality = getCity(locality_field);

    let email;
    if (deal[MENTORS.fields.EMAIL]) {
      email = deal[MENTORS.fields.EMAIL];
    }
    return {
      id: deal.id,
      name: person_name,
      pipeline_id: pipeline_id,
      stage: stage,
      email: email,
      locality: mentor_locality,
      city: deal.owner_name,
      cc_email: deal.cc_email,
      owner_name: owner_name
    };
  });
};

const cityFilter = (mentors, city) => {
  if (city !== "All")
    return mentors.filter(mentor => mentor.owner_name === cohorts[city]);
  return mentors;
};

const stageFilter = (deals, stage) => {
  if (stage !== "All") return deals.filter(deal => deal.stage === stage);
  return deals;
};

function nameFilter(deals, name) {
  if (name !== null && name !== undefined) {
    return deals.filter(obj => {
      if (obj.name) {
        let mentorName = obj.name.toLowerCase();
        return mentorName.includes(name.toLowerCase());
      }
      return null;
    });
  }
  return deals;
}

const getFromPipeDrive = () => {
  return fetch(PIPEDRIVE.api.mentors_deal)
    .then(body => body.json())
    .then(response => response.data || []);
};

const cleanup = mentors => {
  return mentors.filter(mentor => mentor !== null && mentor !== undefined);
};

export const getMentors = (city, stage, name) => {
  return getFromPipeDrive()
    .then(deals => reshape(deals))
    .then(deals => cleanup(deals))
    .then(deals => stageFilter(deals, stage))
    .then(deals => cityFilter(deals, city))
    .then(deals => nameFilter(deals, name));
};

// export const processDeals = deals => {
//   return Promise.all(
//     deals.map(deal => {
//       console.log(
//         `starting processing ${deal.id} from ${deal.city} with email ${
//           deal.email
//         } and cc email ${deal.cc_email}`
//       );

//       return (
//         sendEmail(deal)
//           // .then(deal => moveDeal(deal, MENTORS.status.CONTACTED))
//           // // .then(inviteToSlack)
//           .then(data => {
//             console.log("finished processing  " + deal.id);
//             return data;
//           })
//           .catch(error => Error(error))
//       );
//     })
//   );
// };
