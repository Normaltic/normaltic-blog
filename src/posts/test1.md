---
title: 테스트 1번의 타이틀 함수 합치기~
date: 2020-03-01 15:00:00
---

테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다. 테스트 1번 글입니다.

테스트 1번 글의 두번 째 문단입니다. 저는 지금 테스트를 하고 있습니다. 함수의 합성에 대해 작성해 보겠습니다.

```javascript
const alpha = a => a * a;
const beta = b => b + 2;
const chain = (...args) => x => args.reduce( (value, fn) => fn(value), x );

const calculate = chain( alpha, beta );

const value = calculate(3);

console.log(value);
// 11
```
