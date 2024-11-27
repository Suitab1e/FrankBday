#!/bin/bash

# Create sounds directory if it doesn't exist
mkdir -p public/sounds

# Download sound effects
curl -L "https://www.myinstants.com/media/sounds/error.mp3" -o public/sounds/error.mp3
curl -L "https://www.myinstants.com/media/sounds/click.mp3" -o public/sounds/click.mp3
curl -L "https://www.myinstants.com/media/sounds/nyan-cat.mp3" -o public/sounds/nyan.mp3
curl -L "https://www.myinstants.com/media/sounds/mlg-airhorn.mp3" -o public/sounds/airhorn.mp3
curl -L "https://www.myinstants.com/media/sounds/bruh.mp3" -o public/sounds/bruh.mp3
curl -L "https://www.myinstants.com/media/sounds/rick-roll.mp3" -o public/sounds/rickroll.mp3
curl -L "https://www.myinstants.com/media/sounds/success.mp3" -o public/sounds/success.mp3
curl -L "https://www.myinstants.com/media/sounds/fail.mp3" -o public/sounds/fail.mp3
curl -L "https://www.myinstants.com/media/sounds/konami.mp3" -o public/sounds/konami.mp3
curl -L "https://www.myinstants.com/media/sounds/sandstorm.mp3" -o public/sounds/sandstorm.mp3 