# LINE reminder bot

A LINE bot sends reminding message at specific time appointed by user

## How to use

### Install deps

```shell
$ npm install
```

### Configuration

1. Create a **.env** file at project root(remember to add this **.env** file into **.gitignore** file, which should also located at project root)
2. Add two variables(as below)
3. Fill in your own **token** and **secret**( get them on https://developers.line.biz/console/) in **.env** file

```shell
CHANNEL_SECRET=*YOUR_CHANNEL_SECRET* // type of this value should be "string"
CHANNEL_ACCESS_TOKEN=*YOUR_CHANNEL_ACCESS_TOKEN* // type of this value should be "string"
```

### Run

```shell
$ node .
```

## Webhook URL

```
https://your.base.url
```
