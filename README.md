# Web Information System Final Project

> This repository and the code it contains was prepared by Amy-Caroline Downing, Anica Rimac, Eline de Witte and Eren Janberk Genç as part of the requirements for completing the "Web Information Systems" class, offered by the MSc Digital Humanities programme in KU Leuven.

## What is this repository about?

Our web information systems project

## Repository structure

The application has 3 webpages:

1. The landing page
    

3. The convertion page
   On the right a space-picture is shown. It is abstracted from the NASA picture of the day API.
   You can get a new image by clicking the button 'randomize' or by choosing a date and clicking search.
   If you like the picture you can extract its color palette by clicking 'extract color palette'. 
   The 6 most important colors are then shown in the middle of the page. 
   This extraction is done in the backend using python, using machine learning.
   A clustering algorithm, namely kmeans, was used. By clicking the button 
   'search Europeana using this palette'  you will get you a picture from the Europeana API
    with the 6 colors and show it on the left of the page.


3. The about page 
    Here you can find information on the project and the people who contributed to the project.

Our website only works if you have the backend running locally!