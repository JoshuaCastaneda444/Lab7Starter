# Lab 7 - Starter

Name: Joshua Castaneda

## Check your (my) understanding

1. I think "1. Within a Github action that runs whenever code is pushed" is most appropriate. People are lazy, I am lazy. I know that if I can't depend on myself to consistently run these tests I know I can't depend on someone else to do so. Implementing them within a github action will make sure that at each small change (or at least the commits *should* be small), nothing breaks.
2. No, you would use a unit test for that. You just said that end to end testing was not emulating user actions??? We learned last lab (I think; I don't even remember at this point) about unit tests which are for validating individual, small functions.
3. To put it in simple terms, it seems like navigation mode tests how well a page loads while snapshot mode seems to focus more on the structure of the website at specific moment in time. Things that navigation mode focuses on for its performance score are things like "First Contenful Paint" which ultimately measures response time while the snapshot mode pointed things out like the images not being displayed at their original dimensions.
4. Three Improvements
   1. Add a meta tag. It kept comming up in the navigation and snapshot mode reports.
   2. Either crop the images or compress them to reduce load times since the images are not being used are their full dimensions anyway.
   3. Another thing the navigation report suggested was to minify the JavaScript in order to further reduce load times.