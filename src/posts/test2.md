---
title: 테스트 2번 글 useValidation
date: 2020-03-02 17:00:00
---

테스트 2번 글ㅁㄴㅇㄴㅁㅇ.테스트 2번 글ㅁㄴㅇㄴㅁㅇ.테스트 2번 글ㅁㄴㅇㄴㅁㅇ.테스트 2번 글ㅁㄴㅇㄴㅁㅇ.테스트 2번 글ㅁㄴㅇㄴㅁㅇ.테스트 2번 글ㅁㄴㅇㄴㅁㅇ.테스트 2번 글ㅁㄴㅇㄴㅁㅇ.테스트 2번 글ㅁㄴㅇㄴㅁㅇ.테스트 2번 글ㅁㄴㅇㄴㅁㅇ.테스트 2번 글

테스트 2번 글의 두 번째 문단입니다. 여기에서는 useValidation 을 작성하겠습니다.

```javascript
import {useState} from 'react';

const useValidation = ( defalutValue = '', validator = () => true ) => {
  const [value, setValue] = useState(defaultValue);
  const [isValid, setValid] = useState(
    validator(defaultValue)
  );

  const handleChange = val => {
    setValue(val);
    const validate = validator(val);
    if( isValid !== validate ) setValid(validate);
  }

  return [value, handleChange, isValid];
}
```