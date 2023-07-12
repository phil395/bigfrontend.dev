[https://bigfrontend.dev/problem/implement-spyOn](https://bigfrontend.dev/problem/implement-spyOn)

If you did unit test before, you must be familiar with Spy.

You are asked to create a spyOn(object, methodName), which works the same as jest.spyOn().

To make it simple, here are the 2 requirements of spyOn

+ original method should be called when spied one is called
+ spy should have a calls array, which holds all the arguments in each call.

Code to explain everything.

```js
const obj = {
   data: 1, 
   increment(num) {
      this.data += num
   }
}

const spy = spyOn(obj, 'increment')

obj.increment(1)

console.log(obj.data) // 2

obj.increment(2)

console.log(obj.data) // 4

console.log(spy.calls)
// [ [1], [2] ]
```
