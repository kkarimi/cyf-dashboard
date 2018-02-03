import { PIPEDRIVE } from "./constants";

export function moveDeal(deal, stage) {
  console.info(`moveing deal ${deal.id} from ${deal.stage} to ${stage}`);
  const dealURL = `${PIPEDRIVE.api.base}/deals/${deal.id}?api_token=${
    PIPEDRIVE.key
  }`;

  return fetch(dealURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      stage_id: stage
    })
  }).then(() => deal);
}

// const getPerson = id => {
//   const personURL = `https://api.pipedrive.com/v1/pipelines/${mentorsPipeline}/deals?start=${mentorsDeal}&api_token=${pipedriveKey}`;

//   console.info("");
// };
