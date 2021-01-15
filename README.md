# Code Compliance: Backend

This is the backend for the [Code
Compliance](https://github.com/codeisscience/codecompliance-frontend) web
application.

## Testing locally

### Installing dependencies

#### Poetry

After cloning this repo, you can use
[Poetry](https://python-poetry.org/docs/#installation) to create the virtual
environment (virtualenv) and install the dependencies on it.

First, spawn a shell with the virtualenv activated (you can use `exit`/Ctrl+D
to leave the shell/virtualenv):

```console
$ poetry shell
```

Then, install the dependencies:

```console
$ poetry install
```

If installation succeeds, you should be able to see the current installed Flask
version:

```console
$ flask --version
```

### Running

This is a Flask application, so you should run as:

```console
$ FLASK_APP=app flask run
```
