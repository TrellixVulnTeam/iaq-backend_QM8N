module.exports = function timeConverter(UNIX_timestamp) {
  const dtFormat = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "medium",
    dateStyle: "full",
    timeZone: "Europe/London",
  });
  return dtFormat.format(new Date(UNIX_timestamp)).toString() + " (BST)";
};
