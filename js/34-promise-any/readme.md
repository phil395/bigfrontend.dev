Can you implement a any() to work the same as Promise.any()?

note

AggregateError is not supported in Chrome yet, but you can still use it in your code since we will add the Class into your code. Do something like following:

```js
new AggregateError(
  'No Promise in Promise.any was resolved', 
  errors
)
```
