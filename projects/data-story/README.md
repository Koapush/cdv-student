## Sleep VS. Exercise
Suffering sleep problems? Wanna know how exercise influence sleep? This is a data visualization project for you revealing the relationship between sleep and exercise based on National Sleep Foundation's [*Sleep in America Poll*](https://www.sleepfoundation.org/professionals/sleep-americar-polls/2013-exercise-and-sleep). You can either browse the website to see a general trend, or see yourself by inputting your personal condition including age, time to bed, sleep durations, exercising frequency, etc at the very first beginning.

### links
- link to the project [here](https://koapush.github.io/cdv-student/projects/data-story/)
- paper prototype [here](https://github.com/Koapush/cdv-student/blob/main/projects/data-story/paper-prototype.pdf)
- contextual [report](https://docs.google.com/document/d/1cDzqWPpsl3j5gNwE3g2FKcNkaeO5fTKNM9SC_A4lPik/edit) and [presentation slides](https://docs.google.com/presentation/d/1SB5UsZYPoDOT8SxcKB8L67YrwkyXeGYXvuoY3cEktJU/edit)

### demo  
![](gif/1.gif)

### about data
- [questionnaire](https://www.sleepfoundation.org/wp-content/uploads/2018/10/SIAQuestionnaire2013.pdf)
- [raw data](https://els-jbs-prod-cdn.jbs.elsevierhealth.com/pb/assets/raw/Health%20Advance/journals/sleh/2013SleepinAmericaPollExerciseandSleepRawDataExcel.xls) <br>

Since the raw data excel is a collection of 1,000 respondents' answers to the above questionnaire, the data is all option numbers of questions. Most of the option numbers represent time spans/types of conditions rather than specific data to visualize, therefore in the js file I manually convert columns of option numbers into the corresponding amount of time/exercise/etc. In order to visualize data points diversely, I apply functions such as Math.random() and Math.floor() to those option numbers representing numerical intervals (the first four questions in the questionnaire might serve as a good example here).

### about process
- Why did you choose to visualize the data in this way?
- What can be seen in the visualization? Does it reveal something you didn't expect?
- Did you make crucial compromises? Which ones?
- If you had more time, what would you change, improve, add to the project?
