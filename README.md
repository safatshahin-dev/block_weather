Weather is a Moodle block to show the weather of the user using the geolocation. This shows the realtime weather of the user by getting the geolocation from their browser.

Weather information requires a weather provider to be used, that's why this plugin currently supports three different weather information provider:
1. OpenWeather (https://openweathermap.org)
2. AccuWeather (https://www.accuweather.com)
3. Climacell (https://www.climacell.co)

All these providers have free to premium subscriptions regarding the number of requests (which will depend on the number of users in the Moodle instance), just need to create an account, get the API key and save that key in the settings of this plugin will start getting the weather information for the users. A step by step instruction to
configure each of these weather providers is given below.
User will be asked to allow location services while using this service, it's their choice to allow or block in order to use the weather block.

Step by step instructions to get the API key:
1. OpenWeather:
    a. Go to the following URL: https://openweathermap.org
    b. In the navigation, click Pricing.
    c. Select the appropriate subscription for the organisation, you can choose from free to premium.
    d. After selecting a subscription, it will go to create an account page. Create the account hare.
    e. After successful creation of the account, it will ask to mention the organisation name and industry of the organisation. Fill up those two and save changes.
    f. A confirmation email will be sent to your email address. Verify the email by using the email send from OperWeather.
    g. You should be already logged in if not log in and you will see a navigation option named API keys. Click that option.
    h. Here you will be able to see the key under the Key section, copy the key and go to your Moodle instance where you installed the Weather block.
    i. log in to your Moodle instance and navigate to Site administration.
    j. Go to Plugins > Blocks > Weather.
    k. Select API provider to OpenWeather from the dropdown.
    l. Go to the section named OpenWeather, paste the API key and save changes. Now just add the Weather block in the page you want and see the magic. The browser will ask you to allow location, allow that while asked.
    
2. AccuWeather:
    a. Go to the following URL: https://developer.accuweather.com
    b. In the navigation, click Register.
    c. A confirmation email will be sent to the email address provided. Go to the email and click the confirmation link to confirm the account. Create the password while asked and save changes.
    d. Now select the Packages & Pricing from the navigation and select the desired subscription, it has free to premium packages.
    e. After selecting, it will go to the application page, click Add a new app.
    f. It will give you a form, follow the following instructions to fill up the form:
        i. App name: give a name relevant to your Moodle instance.
        ii. Product: already selected, no need to change.
        iii. Where will the API be used?: Select Desktop Website.
        iv. What will you be creating with this API?: Select Weather App
        v. What programming language is your APP written in?: Select Javascript
        vi. Is this for Business to Business or Business to Consumer use?: Select according to your organisation.
        vii. Is this Worldwide or Country specific use?: Select according to your organisation.
    g. Now the app is created. You will see the name of the app in the list. Select the name and you will see the API key.
    h. Copy the API key and go to your Moodle instance where you installed the Weather block.
    i. log in to your Moodle instance and navigate to Site administration.
    j. Go to Plugins > Blocks > Weather.
    k. Select API provider to AccuWeather from the dropdown.
    l. Go to the section named AccuWeather, paste the API key and save changes. Now just add the Weather block in the page you want and see the magic. The browser will ask you to allow location, allow that while asked.  
     
3. Climacell:
    a. Go to the following URL: https://www.climacell.co
    b. In the navigation, click Weather API.
    c. Clock Start now and it will go to the pricing page. Select the desired subscription, it has free to premium packages.
    d. Click the Start now for the desired package and it will go to the signup page. Fill up the form and click Sign up.
    e. Go to the email and verify the signup. It will verify and go to the login page. Login here with the credentials.
    f. Now you will see the dashboard which includes the plan details and section named Your Key.
    g. Click the eye icon to see the key and copy manually or click copy button to copy the key and go to your Moodle instance where you installed the Weather block.
    i. log in to your Moodle instance and navigate to Site administration.
    j. Go to Plugins > Blocks > Weather.
    k. Select API provider to Climacell from the dropdown.
    l. Go to the section named Climacell, paste the API key and save changes. Now just add the Weather block in the page you want and see the magic. The browser will ask you to allow location, allow that while asked.     

Important notes:
1. None of the geolocation and weather information of the users is saved inside the platform.
2. Users will their full control of allowing or blocking the location services for the Moodle instance.
