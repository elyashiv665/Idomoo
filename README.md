Run:

    server: cd server && npm install && node server.js
    client: cd client && npm install && npm start

Architecture:
        
  The client call the server to generate video and get a response. if the response is ok the client will 
  call the server every 3 second to check for the status of the video, the client will do that at most 50 times.
  Thous numbers has no meaning and I choose them for dev convinient, also they are configurable.

  when the video is ready the client will display Idomoo player with the video.