# Knockoff

## Purpose
Experiment in building a lightweight Web Service Faking framework.  Similar to something like [webmock](https://github.com/bblimke/webmock).

## How it is different

In the case of Knockoff, the framework itself is a RESTful web service and is configured of HTTP via RESTful calls.  This allows it to be run standalone and service multiple Testing Clients.
Also with this strategy, all the "mocking logic" stays in the respective Client code bases and they need to only leverage their given HTTP libraries in order to configure Knockoff.

## Install

```
npm install

# Run tests
./grunt

# start web service
node app
```

## Documentation

Still in early development statges, Doc will appear once framework is usable.
