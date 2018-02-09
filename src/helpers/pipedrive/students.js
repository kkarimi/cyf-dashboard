import { PIPEDRIVE, getStudentStage } from "./constants";
import { cohorts } from "../cyf";

const removeNewLine = name => {
  if (name) return name.replace(/(\r\n|\n|\r)/gm, "");
};

// TODO: Make generic

const getFromPipeDrive = () => {
  return fetch(PIPEDRIVE.api.student_deal)
    .then(body => body.json())
    .then(response => response.data || [])
    .catch(error => console.error(Error(error)));
};

const reshape = deals => {
  return deals
    .filter(deal => (deal.pipeline_id === 1 ? deal : null))
    .map(deal => {
      const stage = getStudentStage(deal.stage_id);
      const name = removeNewLine(deal.title.replace("deal", ""));

      return {
        id: deal.person_id ? deal.person_id.value : deal.id,
        name: name,
        city: deal.owner_name,
        email: deal.person_id ? deal.person_id.email[0].value : "",
        owner_name: deal.owner_name,
        cc_email: deal.cc_email,
        stage: stage
      };
    });
};

// const reshape2 = deals => {
//   console.table(deals);
//   return deals.map(deal => {
//     debugger;
//     console.info(deal);
//     if (deal.person_id && deal.person_id.email) {
//       console.info(deal.person_id.email);
//     }
//     const stage = getStudentStage(deal.stage_order_nr);
//     return {
//       id: deal.person_id,
//       name: deal.person_name,
//       city: deal.owner_name,
//       owner_name: deal.owner_name,
//       cc_email: deal.cc_email,
//       stage: stage
//     };
//   });
// };

const cleanup = students => {
  console.info("cleanup", students);
  students = [...new Set(students)];
  return students.filter(student => student !== null && student !== undefined);
};

const cityFilter = (student, city) => {
  console.info("city", city, student);
  if (city !== "All")
    return student.filter(student => student.owner_name === cohorts[city]);
  return student;
};

const stageFilter = (deals, stage) => {
  console.info("stage", stage, deals);
  if (stage !== "All") return deals.filter(deal => deal.stage === stage);
  return deals;
};

function nameFilter(deals, name) {
  console.info("name", name, deals);
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

export const getStudents = (city, stage, name) => {
  console.info(city, stage, name);

  return getFromPipeDrive()
    .then(deals => reshape(deals))
    .then(deals => cleanup(deals))
    .then(deals => stageFilter(deals, stage))
    .then(deals => cityFilter(deals, city));
  // .then(deals => nameFilter(deals, name));
};
