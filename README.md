# Pubbie

Pubbie is a basic Pub/Sub Library. Handles your basics such as subscribing, publishing,
and unsubscribing events/tokens.

## Usage
```javascript
var counter = 0,
    func    = function (arg) {
        counter = arg || 1;
    };

pubbie.subscribe('message', func);

pubbie.publish('message'); // counter === 1;
pubbie.publish('message', [2]); // counter === 2

pubbie.unsubscribe('message');
pubbie.publish('message'); // counter === 2 | Will remain at 2 as the function no longer exists.
```

## Functions
#### pubbie.subscribe(namespace, fn)
#### pubbie.publish(namespace[, args])
#### pubbie.unsubscribe(identifier)

## Want to play with Pubbie?

__NodeJS is required__, once installed run `npm install` in the directory to get all dependancies.
If you can't be bothered with the unit tests/building, just edit the source code found in the `src/` folder.

## Testing

Simply run `grunt test`

## Building

Once you've made the changes you wish to make to the source code, simply run `grunt` to get a minified version
in the build folder.

### Contributing

Please feel free to open pull requests/issues regarding __Pubbie__.
