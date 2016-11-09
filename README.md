> Monitor System

# Front-End

## Build Setup

### install dependencies
`npm install`

### serve with hot reload at localhost:8080
`npm run dev`

### build for production with minification
`npm run build`

# Back-End
<pre>
### Directory
+-- web-server
|   +-- main.js entry
|   +-- temp folder for temporary uploader images
|   +-- auth
|   |   +-- auth.js Header Authorization Methods & headerAuth middleware
|   +-- route
|   |   +-- data
|   |   |   +-- data_router.js store/retrive monitor_data
|   |   +-- event
|   |   |   +-- event_router.js store/retrive monitor_event
|   |   +-- media
|   |   |   +-- media_router.js 
|   |   +-- uploader
|   |   |   +-- uploader Accepting Image uploads and Search for identical/similar results within database
|   |   |   +-- featureCalculation Store the feature calculation program
|   |   +-- user
|   |   |   +-- user.js jws token verification
|   |   l   +-- use_route For later user login & retrive user medias
|   |
</pre>

