## Please make sure you have Python 3.7 or higher, and run the following command
##`Python -m pip install pipenv`

This code runs in a virtual enviornment which conveniently packages the dependencies

When pipenv is installed, navigate to this directory and run 

`pipenv install`

This makes sure that all dependencies are installed on your system

`pipenv shell`

Brings you to the virtual enviornment's shell

`python keras/setup.py install`

Makes sure keras is installed

`python djsr/manage.py runserver --nothreading`

Will start the server, without threads, this is essential for correctly running the srver without Keras induced errors
