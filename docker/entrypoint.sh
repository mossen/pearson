#!/bin/bash -eux

if [ "$INIT" -eq "1" ]
then
    echo "npm has installed packages!"
    npm install
fi

if [ "$TEST" -eq "1" ]
then
    echo "running tests..."
    CI=1 npm test
fi

echo "serving..."
npm start
