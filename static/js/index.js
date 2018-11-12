

function applyStyle(id, style) {
  if (style) {
    var el = document.getElementById(id);
    if (el) {
      el.setAttribute('style', style);
    }
  }
}

function setupUIControls () {
  //hide the step 2 items for factors
  $("#username-error").hide();
  $("#code-error-box").hide();
  $("#smsModalContent").hide();
  $("#googleAuthModalContent").hide();
  $("#oktaVerifyModalContent").hide();
  $("#oktaVerifyPushModalContent").hide();
  $("#voiceModalContent").hide();
  $("#signin-container").show();
  //hide factors admin did not select
  if (!okta_factorOktaVerifyCode)
    $("#verify-code").hide();
  if (!okta_factorOktaVerifyPush)
    $("#verify-push").hide();
  if (!okta_factorGoogleAuth)
    $("#googleAuth").hide();
  if (!okta_factorSMS)
    $("#sms").hide();
  if (!okta_factorVoice)
    $("#voice").hide();

  $("a.button").on("click", onButtonFactorClick);

}

function setBackgroundImage() {
  applyStyle('login-bg-image', "background-image: url("+okta_background+")");
  applyStyle('login-bg-image-ie8', "filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+okta_background+", sizingMethod='scale')");
}


function onButtonFactorClick(event) {
  console.log("onButtonFactorClick()");
  //console.log(event);
  button = event.target.id;
  console.log(button);

  //need a Name
  if ($("#username").val() == "") {
    $("#username-error").show();
    return;
  }

  $("#step1").hide();
  $("#code-error-box").hide();

  $("#smsModalContent").hide();
  $("#googleAuthModalContent").hide();
  $("#oktaVerifyModalContent").hide();
  $("#oktaVerifyPushModalContent").hide();
  $("#voiceModalContent").hide();
  if (button == "verify-code") {
    $("#oktaFactorType").val("token:software:totp");
    displayMFAOktaVerify();
    $("#oktaVerifyCode").focus();
  } else if (button == "verify-push") {
    $("#oktaFactorType").val("push");
    //requestCode("push");
    submitCode();
    displayMFAOktaVerifyPush();
  } else if (button == "googleAuth") {
    $("#oktaFactorType").val("GOOGLE");
    displayMFAGoogleAuth();
    $("#googleAuthCode").focus();
  } else if (button == "sms") {
    $("#oktaFactorType").val("sms");
    requestCode("sms");
    displayMFASMS();
    $("#smsCode").focus();
  } else if (button == "voice") {
    $("#oktaFactorType").val("call");
    requestCode("call");
    displayMFAVoice();
    $("#voiceCode").focus();
  }
}


function displayMFAGoogleAuth() {
  console.log("displayMFAGoogleAuth()");
  $("#header-text").text("Enter Google Authenticator Code");
  $("#googleAuthModalContent").show();
}

function displayMFASMS() {
  console.log("displayMFASMS()");
  $("#smsModalContent").show();
}

function displayMFAVoice() {
  console.log("displayMFAVoice()");
  $("#header-text").text("Enter Voice Call Code");
  $("#voiceModalContent").show();
}

function displayMFAOktaVerifyPush() {
  console.log("displayMFAOktaVerifyPush()");
  $("#header-text").text("Authorize Okta Verify");
  $("#oktaVerifyPushModalContent").show();
}

function displayMFAOktaVerify() {
  console.log("displayMFAOktaVerify()");
  $("#header-text").text("Enter Okta Verify Code");
  $("#oktaVerifyModalContent").show();
}

function requestCode(factorType) {
  console.log("requestCode()", factorType);
  oktaMFARequest = {
    "username": $("#username").val(),
    //"factorType": $("#oktaFactorType").val()
    "factorType": factorType
  }
  $.ajax({
    url: okta_app_host+"/push_mfa_code",
    type: "POST",
    data: JSON.stringify(oktaMFARequest),
    contentType: "application/json",
    dataType: "json",
    success: function (responseData) {
      console.log(responseData);
    }
  });

}

function submitCode(code) {
  console.log("submitCode()");
  oktaMFARequest = {
    "username": $("#username").val(),
    "factorType": $("#oktaFactorType").val(),
    "code": code
  }
  $.ajax({
    url: okta_app_host+"/push_mfa_code",
    type: "POST",
    data: JSON.stringify(oktaMFARequest),
    contentType: "application/json",
    dataType: "json",
    success: function (responseData) {
      console.log(responseData);
      if (responseData.factorResult == "SUCCESS") {
        console.log("Factor passed!");

        $("#ott").val(responseData.ott);
        $("#changePassword").submit();

      } else if (responseData.factorResult == "WAITING") {
        //Poll until result comes back
        pollingUrl = responseData.pollingUrl;
        pollOktaVerifyPushMFA(pollingUrl, $("#username").val());
      } else {
        //alert("Incorrect Factor Pass Code");
        $("#code-error-box").show();
      }
    }
  });
}

function pollOktaVerifyPushMFA(pollingUrl, userName) {
  console.log("pollOktaVerifyPushMFA()");
  body = {
    "pollingUrl": pollingUrl,
    "userName": userName
  };

  $.ajax({
    url: okta_app_host+"/mfa_verification_poll",
    type: "POST",
    data: JSON.stringify(body),
    contentType: "application/json",
    dataType: "json",
    success: function (requestData) {
      console.log(requestData);
      if (requestData.factorResult == "WAITING") {
        setTimeout(pollOktaVerifyPushMFA(pollingUrl, userName), 3000);
      } else if (requestData.factorResult == "SUCCESS") {
        console.log("Factor passed!");
        console.log(requestData);
        $("#ott").val(requestData.ott);
        $("#changePassword").submit();
      } else {
        alert("Failed factor!");
      }
    }
  });
}
