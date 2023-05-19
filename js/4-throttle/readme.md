[https://bigfrontend.dev/problem/implement-basic-throttle](https://bigfrontend.dev/problem/implement-basic-throttle)

could you implement your own version of basic throttle()?

In case you forgot, throttle(func, delay) will return a throttled function, which will invoke the func at a max frequency no matter how throttled one is called.

Here is an example.

Before throttling we have a series of calling like

```
─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G
```

After throttling at wait time of 3 dashes

```
─ A ─ ─ ─ C ─ ─ ─D ─ ─ ─ ─ E ─ ─ ─ G 
```

**Be aware that**

+ call A is triggered right way because not in waiting time
+ function call B is swallowed because B, C is in the cooling time from A, and C is latter.

**notes**

+ please follow above spec. the behavior is not exactly the same as lodash.throttle()

+ because window.setTimeout and window.clearTimeout are not accurate in browser environment, they are replaced to other implementation when judging your code. They still have the same interface, and internally keep track of the timing for testing purpose.
