var Future;

Future = Npm.require('fibers/future');

Meteor.methods({
  validateEmailAddress: function(address) {
    var validateEmail;
    check(address, String);
    validateEmail = new Future();
    HTTP.call("GET", "https://api.kickbox.io/v1/verify", {
      params: {
        email: address,
        apikey: '118c952e39dc780fef8f5a972f686afcc20479120714f6b1ade67e2e7ed946a6'
      }
    }, function(error, response) {
      if (error) {
        return validateEmail["return"](error);
      } else {
        if (response.data.result === "invalid" || response.data.result === "unknown") {
          return validateEmail["return"]({
            error: "Sorry, your email was returned as invalid. Please try another address."
          });
        } else {
          return validateEmail["return"](true);
        }
      }
    });
    return validateEmail.wait();
  }
});
