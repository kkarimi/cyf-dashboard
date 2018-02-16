import { cohorts, getCity } from "../cyf";

// import { moveDeal } from "./index";
// import { sendEmail } from "../email";

import { PIPEDRIVE, MENTORS, getMentorStage } from "./constants";

const removeNewLine = name => {
  if (name) return name.replace(/(\r\n|\n|\r)/gm, "");
};

const reshape = deals => {
  return deals.map(deal => {
    let { pipeline_id, person_name, owner_name } = deal;

    pipeline_id = pipeline_id === MENTORS.pipeline ? "mentor" : "";
    person_name = removeNewLine(person_name);

    const stage = getMentorStage(deal.stage_id);

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
  if (name !== null && name !== undefined && name !== "") {
    return deals.filter(obj => {
      if (obj.name) {
        console.info(`searching for ${name} in ${obj.name}`);
        let mentorName = obj.name.toLowerCase();
        return mentorName.includes(name.toLowerCase());
      }
      return null;
    });
  }
  return deals;
}

const getFromPipeDrive = () => {
  return fetch(PIPEDRIVE.api.mentor_deal)
    .then(body => body.json())
    .then(response => response.data || [])
    .catch(error => Error(error));
};

const cleanup = mentors => {
  return mentors.filter(mentor => mentor !== null && mentor !== undefined);
};

export const getMentors = (city, stage, name) => {
  console.info(city, stage, name);
  return getFromPipeDrive()
    .then(deals => reshape(deals))
    .then(deals => cleanup(deals))
    .then(deals => stageFilter(deals, stage))
    .then(deals => cityFilter(deals, city))
    .then(deals => nameFilter(deals, name))
    .catch(error => Error(error));
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
