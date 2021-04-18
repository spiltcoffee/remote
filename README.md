# remote

TV Remote website for Sony Bravia TVs.

## Development

```
  $ yarn
  $ yarn serve
```

## Production

```
  $ yarn
  $ yarn build
```

or

```
  $ docker build -t spiltcoffee/remote .
  $ docker rm -f remote
  $ docker run --rm --name remote -dp 8080:80 -v $TV_SETTINGS_FILE:/usr/share/nginx/html/settings.json spiltcoffee/remote
```

## Settings

Build a JSON file that matches the schema evident in `./src/public/settings.json`, then provide the file path into the environment path `TV_SETTINGS_FILE`.
