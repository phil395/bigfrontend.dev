[https://bigfrontend.dev/problem/implement-once](https://bigfrontend.dev/problem/implement-once)

`_.once(func)` is used to force a function to be called only once, later calls only returns the result of first call.

Can you implement your own once()?

```js
function func(num) {
  return num
}

const onced = once(func)

onced(1) 
// 1, func called with 1

onced(2)
// 1, even 2 is passed, previous result is returned
```
