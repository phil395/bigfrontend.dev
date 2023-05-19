[https://bigfrontend.dev/problem/decode-message](https://bigfrontend.dev/problem/decode-message)

Your are given a 2-D array of characters. There is a hidden message in it.
```js
const encodedMessage = [
  ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
  ['G', 'H', 'O', 'E', 'L', 'A', 'D']
]
```

The way to collect the message is as follows

1) start at top left
2) move diagonally down right
3) when cannot move any more, try to switch to diagonally up right
4) when cannot move any more, try switch to diagonally down right, repeat 3
5) stop when cannot neither move down right or up right. the character on the path is the message

for the input above, `IROCLED` should be returned.

**notes**

if no characters could be collected, return empty string
