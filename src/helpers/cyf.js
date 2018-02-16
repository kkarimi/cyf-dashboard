export const cohorts = {
  London: "London",
  Scotland: "Scotland",
  Glasgow: "Scotland",
  Manchester: "Manchester",
  Newcastle: "Newcastle",
  Birmingham: "Birmingham",
  Ireland: "Ireland",
  Other: "Other",
  General: "General"
};

export const getCity = locality => {
  if (locality) {
    locality = locality.toLowerCase();
    if (locality.indexOf("london") > -1) return cohorts.london;
    if (locality.indexOf("glasgow") > -1) return cohorts.glasgow;
    if (locality.indexOf("scotland") > -1) return cohorts.glasgow;
    if (locality.indexOf("manchester") > -1) return cohorts.manchester;
    if (locality.indexOf("ireland") > -1) return cohorts.Ireland;
    if (locality.indexOf("general") > -1) return cohorts.General;
  }
  return cohorts.other;
};
