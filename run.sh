#!/bin/bash

#export METEOR_WATCH_FORCE_POLLING=1
#export METEOR_WATCH_POLLING_INTERVAL_MS=1000
#export METEOR_PROFILE=1

function pause(){
   read -p "$*"
}


cd apimoon

# when not feeling lazy add trap singal here for this actually to work ;)
while [ 0 -lt 1 ]
do
    meteor -p $IP:$PORT  # --settings settings.json
    pause "Press Enter to restart or Ctrl-C to quit : "
done

cd ..
