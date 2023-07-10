[https://bigfrontend.dev/problem/implement-object-assign](https://bigfrontend.dev/problem/implement-object-assign)

The Object.assign() method copies all enumerable own properties from one or more source objects to a target object. It returns the target object. (source: MDN)

It is widely used, Object Spread operator actually is internally the same as Object.assign() (source). Following 2 lines of code are totally the same.

```js
let aClone = { ...a };
let aClone = Object.assign({}, a);
```

This is an easy one, could you implement Object.assign() with your own implementation ?

note

Don't use Object.assign() in your code It doesn't help improve your skills

