---
title: 테스트 3 useDebouncing 관련!
date: 2020-03-03 09:00:00
---

테스트 3번 글입니다 으아아각테스트 3번 글입니다 으아아각테스트 3번 글입니다 으아아각테스트 3번 글입니다 으아아각테스트 3번 글입니다 으아아각테스트 3번 글입니다 으아아각테스트 3번 글입니다 으아아각

테스트 3번 글의 두번째 문단입니다. 하지만 이번엔 두번째 문단에 작성하지 않고, 세번째 문단까지 넘어갈 예정입니다.

세번째 문단입니다. 디바운싱은 함수의 호출을 지연시키는 행위로써, 주로 타이핑에 대한 실시간 API 호출에서 사용됩니다.

```javascript
import {useEffect} from 'react';

const useDebouncing = (subscribeValue, request, delay) => {
  useEffect( () => {
    const id = setTimeout( () => request(subScribeValue), delay );
    
    return () => clearTimeout(id);
  }, subscribeValue);
  return subscribeValue;
}