okta = {
    "org_host": "https://dev-138929.oktapreview.com", # Okta host org / tennant URL i.e. https://myoktaorg.okta.com
    "api_token": "007kXLShu83-eSJ5bKGtjJbiVtOad1GiYY_56ozJp-", # Okta API Token created for the server side to access Okta's API for your tenant
    "app_host": "http://13.59.135.154:8080", # The URL to access this application, makes redirects and helper urls easier to reference
    "oidc_client_id": "", # OIDC Application created in Okta client id
    "oidc_client_secret": "", # OIDC Application created in Okta client secret
    "redirect_uri": "", # OIDC Redirect URI to handle auth code flow
    "post_oidc_redirect": "", # url to redirect to after successfuly authenticating and getting an oath token
    "factorOktaVerifyCode": "true",
    "factorOktaVerifyPush": "true",
    "factorGoogleAuth": "true",
    "factorSMS": "true",
    "factorVoice": "true"
}
