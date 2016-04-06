#!/bin/bash



URL="http://www.meteorkitchen.com/api/getapp/json/YbtoZeHw2bqXymago"

function fetch {
    git add -u
    git commit -m "Autocommit"
    curl  $URL > apimoon.json
    meteor-kitchen ./apimoon.json apimoon --react
}

function pause(){
   read -p "$*"
}

while [ 0 -lt 1 ]
do
    fetch
    pause "Press Enter to refetch or Ctrl-C to quit : "
done


echo
echo "Thank you."
