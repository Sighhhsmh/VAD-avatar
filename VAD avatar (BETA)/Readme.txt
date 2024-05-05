---------------------------
-----VAD-Avatar (Demo)-----
---------------------------

> extract where ever :>
> launch VAD Avatar.bat 
> test it out (fvk around and find out)

--------------------------
-------For OBS Use--------
--------------------------

theres 2 ways to go about this..


>[The easy way] : run the shortcut/index.html file > use 'Window Capture' in OBS to capture your external browser page.
_______________________________________________________________________________________________________________________

>[The other way] : -(this will let you use the browser source option in OBS)-
 
> Run VAD Avatar.bat (may take a while, python is a prerequisite and will be installed if you dont have it already.)
- The app will launch in a browser 
> Allow microphone permission (you can close the browser now)
> In your OBS, create a browser source with "http://localhost:8000/main" as your URL and press "OK".

> - [if not working try this] - Right-Click OBS shortcut > Properties > Shortcut > in target directory paste this at the end.

                  "  --enable-media-stream --use-fake-ui-for-media-stream --allow-insecure-localhost  "
_______________________________________________________________________________________________________________________

Note: 
-you have to run the .bat file everytime you need to use the browser source. (it needs to create local host server and you need to give it microphone access)

-there is no security issue, everything is open-source and handeled at a local environment[no connection to internet]. you can  edit and check the .bat file if you wish