# docs

Documentation for [Shippable's Automated DevOps platform](https://www.shippable.com)

## Using Local Installation

### With Docker

```bash
git clone git@github.com:Shippable/docs.git shippable-docs
cd shippable-docs
./onebox
```

Docs should be available at `localhost:5555` once the onebox script finishes.

### Without Docker

To get started you have to have git and python3 with pip and virtualenv installed:

```bash
git clone git@github.com:Shippable/docs.git shippable-docs
cd shippable-docs
virtualenv venv
source venv/bin/activate
```

To start documentation server at `localhost:5555`:

```bash
pip install -r requirements.txt
mkdocs serve --dev-addr=localhost:5555
```

This uses livereload to monitors changes to the files.  As soon as you save a file, the browser loads the fresh page.
