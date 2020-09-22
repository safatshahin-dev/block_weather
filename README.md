Weather is a Moodle block to show the weather of the user using the geolocation. This shows the realtime weather of the user by getting the geolocation from their browser.

Weather information requires a weather provider to be used, that's why this plugin currently supports three different weather information provider:
1. OpenWeather (https://openweathermap.org)
2. AccuWeather (https://www.accuweather.com)
3. Climacell (https://www.climacell.co)

All these providers have free to premium subscriptions regarding the number of requests (which will depend on the number of users in the Moodle instance), just need to create an account, get the API key and save that key in the settings of this plugin will start getting the weather information for the users. A step by step instruction to
configure each of these weather providers is given below.
User will be asked to allow location services while using this service, it's their choice to allow or block in order to use the weather block.

Step by step instructions to get the API key:
1. OpenWeather: <br>
    a. Go to the following URL: https://openweathermap.org <br>
    b. In the navigation, click Pricing. <br>
    c. Select the appropriate subscription for the organisation, you can choose from free to premium. <br>
    d. After selecting a subscription, it will go to create an account page. Create the account hare. <br>
    e. After successful creation of the account, it will ask to mention the organisation name and industry of the organisation. Fill up those two and save changes. <br>
    f. A confirmation email will be sent to your email address. Verify the email by using the email send from OperWeather. <br>
    g. You should be already logged in if not log in and you will see a navigation option named API keys. Click that option. <br>
    h. Here you will be able to see the key under the Key section, copy the key and go to your Moodle instance where you installed the Weather block.
    i. log in to your Moodle instance and navigate to Site administration. <br>
    j. Go to Plugins > Blocks > Weather. <br>
    k. Select API provider to OpenWeather from the dropdown. <br>
    l. Go to the section named OpenWeather, paste the API key and save changes. Now just add the Weather block in the page you want and see the magic. The browser will ask you to allow location, allow that while asked. <br>
    
2. AccuWeather: <br>
    a. Go to the following URL: https://developer.accuweather.com <br>
    b. In the navigation, click Register. <br>
    c. A confirmation email will be sent to the email address provided. Go to the email and click the confirmation link to confirm the account. Create the password while asked and save changes. <br>
    d. Now select the Packages & Pricing from the navigation and select the desired subscription, it has free to premium packages. <br>
    e. After selecting, it will go to the application page, click Add a new app. <br>
    f. It will give you a form, follow the following instructions to fill up the form: <br>
        i. App name: give a name relevant to your Moodle instance. <br>
        ii. Product: already selected, no need to change. <br>
        iii. Where will the API be used?: Select Desktop Website. <br>
        iv. What will you be creating with this API?: Select Weather App <br>
        v. What programming language is your APP written in?: Select Javascript <br>
        vi. Is this for Business to Business or Business to Consumer use?: Select according to your organisation. <br>
        vii. Is this Worldwide or Country specific use?: Select according to your organisation. <br>
    g. Now the app is created. You will see the name of the app in the list. Select the name and you will see the API key. <br>
    h. Copy the API key and go to your Moodle instance where you installed the Weather block. <br>
    i. log in to your Moodle instance and navigate to Site administration. <br>
    j. Go to Plugins > Blocks > Weather. <br>
    k. Select API provider to AccuWeather from the dropdown. <br>
    l. Go to the section named AccuWeather, paste the API key and save changes. Now just add the Weather block in the page you want and see the magic. The browser will ask you to allow location, allow that while asked.   <br>
     
3. Climacell: <br>
    a. Go to the following URL: https://www.climacell.co <br>
    b. In the navigation, click Weather API. <br>
    c. Clock Start now and it will go to the pricing page. Select the desired subscription, it has free to premium packages. <br>
    d. Click the Start now for the desired package and it will go to the signup page. Fill up the form and click Sign up. <br>
    e. Go to the email and verify the signup. It will verify and go to the login page. Login here with the credentials. <br>
    f. Now you will see the dashboard which includes the plan details and section named Your Key. <br>
    g. Click the eye icon to see the key and copy manually or click copy button to copy the key and go to your Moodle instance where you installed the Weather block. <br>
    i. log in to your Moodle instance and navigate to Site administration. <br>
    j. Go to Plugins > Blocks > Weather. <br>
    k. Select API provider to Climacell from the dropdown. <br>
    l. Go to the section named Climacell, paste the API key and save changes. Now just add the Weather block in the page you want and see the magic. The browser will ask you to allow location, allow that while asked.      <br>
    
Special tip:
Click on the temperature to change from Celsius to Fahrenheit or vice versa.

Important notes: <br>
1. None of the geolocation and weather information of the users is saved inside the platform. <br>
2. Users will have their full control of allowing or blocking the location services for the Moodle instance. <br>
