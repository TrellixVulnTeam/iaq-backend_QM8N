const { TwitterApi } = require("twitter-api-v2");
const { Site } = require("../models/site");
const { constants } = require("../utils/constants");
const timeConverter = require("./time-converter");

module.exports = async function checkSv(sv) {
  try {
    const client = new TwitterApi({
      appKey: "y883MRupf0GMMSHAOmfyRZyQd",
      appSecret: "R22QzbdM2Em4EtNYarEAx2pkMLEmw9HNsDL8RgewXlpIwYSqw5",
      accessToken: "1555701998351429632-ABv59RICIUM7HCyy7xNieL52PUWHXd",
      accessSecret: "qW9TRttqVo6bCp8KnYSARxq2v74hvahriJIRdhw0Murp6",
    });
    const rslt = await Site.find({ _id: sv.site });
    rslt[0].updatedAt = Date.now();
    
    // console.log("Res", rslt);
    if (sv.co2 > constants.co2Threshold) {
      if (rslt[0].isCo2Check) {
        client.v1
          .tweet(
            `Co2 level is high at ${rslt[0].name}.\nMeasured Co2: ${
              sv.co2
            }ppm on ${timeConverter(sv.createdAt)}`
          )
          .then((val) => {
            console.log("Tweet successfull!");
          })
          .catch((err) => {
            console.log(err);
            console.log(" Cannot tweet!");
          });

        rslt[0].isCo2Check = false;
        // await rslt[0].save();
      }
    }

    if (sv.co2 <= constants.co2Threshold && sv.co2 != 0) {
      if (!rslt[0].isCo2Check) {
        client.v1
          .tweet(
            `Co2 level is back to normal at ${rslt[0].name}.\nMeasured Co2: ${
              sv.co2
            }ppm on ${timeConverter(sv.createdAt)}`
          )
          .then((val) => {
            console.log("Tweet successfull!");
          })
          .catch((err) => {
            console.log(err);
            console.log(" Cannot tweet!");
          });

        rslt[0].isCo2Check = true;
        // await rslt[0].save();
      }
    }

    if (sv.voc > constants.vocThreshold) {
        if (rslt[0].isVocCheck) {
          client.v1
            .tweet(
              `VOCs levels are high at ${rslt[0].name}.\nMeasured VOCs: ${
                sv.voc
              }ppb on ${timeConverter(sv.createdAt)}`
            )
            .then((val) => {
              console.log("Tweet successfull!");
            })
            .catch((err) => {
              console.log(err);
              console.log(" Cannot tweet!");
            });
  
          rslt[0].isVocCheck = false;
        //   await rslt[0].save();
        }
      }
  
      if (sv.voc <= constants.vocThreshold) {
        if (!rslt[0].isVocCheck) {
          client.v1
            .tweet(
              `VOCs levels are back to normal at ${rslt[0].name}.\nMeasured VOCs: ${
                sv.voc
              }ppb on ${timeConverter(sv.createdAt)}`
            )
            .then((val) => {
              console.log("Tweet successfull!");
            })
            .catch((err) => {
              console.log(err);
              console.log(" Cannot tweet!");
            });
  
          rslt[0].isVocCheck = true;
        //   await rslt[0].save();
        }
      }

      await rslt[0].save();
  
  } catch (e) {
    console.log(e);
  }
};
