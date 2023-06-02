# TimeKeeper for Google Snake
This mod for Google Snake keeps track of your fastest times and highscores for every mode. To see your personal bests on the current settings, just click on the timer.
## Enable Timekeeper (option 1)
Go to releases and download TimeKeeper.html. Go to your browser and import this file as a new bookmark. Simply press the bookmark to enable the mod.
## Enable Timekeeper (option 2)
Copy and paste all the code inside TimeKeeper.js into the console.
## Set statistics manually
You can set all statistics manually. First set the game to the mode you want to change the statistics of. Make sure you're on the right setting before applying changes by clicking on the timer. Then copy and paste the given code into the console.
### Set total attempts
```
window.snake.timeKeeper.setAttempts(attempts);
```
* Change *attempts* to the total ammount of attempts
### Set Personal Best
```
window.snake.timeKeeper.setPB(time, score, attempts, average);
```
* Change *time* to the time in milliseconds
* Change *score* to 25, 50, 100 or 'ALL'
* Change *attempts* to the total ammount of attempts that reached this point.
* Change *average* to the average time in milliseconds
### Set Highscore
```
window.snake.timeKeeper.setScore(highscore, time, average);
```
* Change *highscore* to your highscore
* Change *time* to the time in milliseconds
* Change *average* to the average score

## Export/backup pbs
Click the export button to download a file. This files contains all your data.
## Restore pbs
Follow the instructions in the file.
## Remove all pbs
```
localStorage.removeItem('snake_timeKeeper');
```

