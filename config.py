okta = {
    "org_host": "https://ironman.oktapreview.com", # Okta host org / tennant URL i.e. https://myoktaorg.okta.com
    "api_token": "api key here", # Okta API Token created for the server side to access Okta's API for your tenant
    "app_host": "http://18.222.141.236:8080", # The URL to access this application, makes redirects and helper urls easier to reference
    "org_host": "https://xxxx.oktapreview.com", # Okta host org / tennant URL i.e. https://myoktaorg.okta.com
    "api_token": "xxxxx", # Okta API Token created for the server side to access Okta's API for your tenant
    "app_host": "http://xxxx:8080", # The URL to access this application, makes redirects and helper urls easier to reference
    "oidc_client_id": "", # OIDC Application created in Okta client id
    "oidc_client_secret": "", # OIDC Application created in Okta client secret
    "redirect_uri": "", # OIDC Redirect URI to handle auth code flow
    "post_oidc_redirect": "", # url to redirect to after successfuly authenticating and getting an oath token
    "factorOktaVerifyCode": "true",
    "factorOktaVerifyPush": "true",
    "factorGoogleAuth": "true",
    "factorSMS": "true",
    "factorVoice": "true",
    "factorQuestion": "true"
}
