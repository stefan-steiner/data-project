# README

To deploy:

* Make sure that you are using Rails 5 with `rails -v`

* Clone the repository with `git clone https://github.com/stefan-steiner/data-project.git`

* Enter the project directory with `cd data-project`

* Install neccessary gems with `bundle install`

* Run the server with `rails s`

* Navigate to `localhost:3000` in your browser


This web application uses datasets from [OpenData Baltimore](https://data.baltimorecity.gov/). It is designed to find routes to and from various landmarks and parks in Baltimore. The user is able to flter, search, and order results.

Some functionality is limited by the need to dynamically request directions and distances from the Google Maps API. Randomness is added to reduce the size of these requests.

Testing scripts can be run by calling the function unitTests, or uncommenting line 90 in script.js.

Any feedback is greatly appreciated.

Enjoy!

Stefan Steiner