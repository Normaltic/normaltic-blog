---
title: useEffect와 Lifecycle
date: 2020-09-04 21:00:00
url: useeffect-and-lifecycle
---

> Hooks는 React v16.8 에 도입된 기능으로, 상태 관리와 같은 다양한 기능들을 함수형 컴포넌트에서도 사용할 수 있게 해준다.
> 자주 사용하는 공용 로직의 경우, Custom Hook을 작성하여 재사용을 쉽게 할 수 있다.
> ( 참고 : [공식 홈페이지](https://ko.reactjs.org/docs/hooks-intro.html) )

### 서론

`useEffect` 는 기본적으로 제공되는 훅 중에 하나로, 컴포넌트의 사이드 이펙트를 관리할 수 있다. 의존성에 포함된 값이 변경될때 마다 정의된 이팩트를 일으킨다. 뒷정리가 필요한 이팩트라면, 반환받은 함수를 통해 뒷정리를 수행하기도 한다.

공식 문서에서는, 클래스 컴포넌트에 익숙하다면 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 가 합쳐진 것으로 생각해도 좋다고 한다. 많은 훅 관련 글에서도 역시, `useEffect` 를 주로 세 생명 주기 함수와 연관지어서 설명한다.

그래서 그런지 `useEffect` 를 그저 생명 주기 함수를 대체하는 훅으로만 생각하는 사람들이 가끔씩 있다. 그리고 그런 사람들은, 생명 주기 함수 구현에 집착하다 여러 가지 문제를 직면하곤 한다.

훅에 익숙하지 않은 한 개발자가 있다. 개발자는 어떤 컴포넌트를 작성하면서, 위 설명들을 보고 사용법을 익혀, 마운트 시점에서만 동작할 로직을 `useEffect` 내부에 작성했다.

```js
function Component() {
  ...
  useEffect( () => {
    ...
  }, []);
  ...
}
```

이후 `useEffect` 내부 로직에서 부모 컴포넌트에서 전달하는 `data`를 사용해야 하고, 로직을 외부에서도 실행 가능해야 했다. 그래서 해당 로직을 함수로 분리하고, **"이 함수는 마운트 시점에만 호출되어야 해!"** 라는 의도로 코드를 아래와 같이 수정하였다.

```js
function Component({data}) {
  ...
  const fn = useCallback( () => {
    ...
  }, [data]);

  useEffect( () => {
    fn();
  }, []);
  ...
}
```

함수가 마운트 시점에만 호출되고, 의도대로 동작하는 코드를 작성하여 기뻐하지만, 곧 다음과 같은 메세지를 마주친다.

![사진 1) warning: deps를 빼먹으신 것 같아요!](../images/use_effect_deps_warning.png)

코드가 잘 동작함에도 출력되는 warning에 묘한 기분을 느끼며, 메세지를 제거하기 위해 여기저기 수정을 해본다. 간단한 수정으로 메세지가 사라진다면 정말 좋겠지만, 고칠 방법이 떠오르지 않거나 잘 작동하는 코드를 수정하는데에 점차 실증을 느낀다.

결국, 메세지가 출력되도 못 본 척 하거나 메세지의 원인인 코드의 위에 조심스레 주석을 작성한다.

```js
// eslint-disable-next-line react-hooks/exhaustive-deps
```


### 왜? 잘 돌아가잖아?

맞다. 잘 돌아간다. 앞서 설명한 사례에서 개발자가 충분한 확신을 가지고 개발을 했다면, 눈에 보이는 오류는 없을 것이다. 그저 원하는대로 잘 돌아가는 코드와, 문법(eslint) 관련 warning 메세지만 있다. 그마저도 eslint를 비활성화 하면 오롯이 코드만 남는다.

그럼에도 해당 사례를 굳이 왜 들고왔냐면, 의존성을 속이고 코드를 작성하는 개발자는 대부분 `useEffect` 를 잘못 생각하고 있을 확률이 높기 때문이다. 위의 코드는 의존성을 속여서, 그저 의도대로 돌아가는 것 처럼 보일 뿐이다.

잘못 생각하고 있는 개발자는, 클린업(cleanup)을 역시 `componentWillUnmount` 로만 생각하고 있을 것이다(실제로 그렇게 알고 있는 사람을 봤다.). 그래서 아마, 언마운트 시점에 `fn` 을 호출하려고 할 때에는 아래와 같이 작성할 것이다.

```js
function Component({data}) {
  ...
  const fn = useCallback( () => {
    ...
  }, [data]);

  useEffect( () => {
    return fn;
  }, []);
  ...
}
```

컴포넌트가 마운트-언마운트 되는동안 `data`가 한번이라도 바뀌었다면, 대부분 의도한대로 동작하지 않을 것이다. 언마운트 시점엔 처음 선언되었던 `fn`을 호출할 것이다. 의존성에 `fn`을 명시하더라도, 의도와는 다르게 `fn` 이 재정의 될 때마다 호출되어, 머리가 아프기 시작한다. 결국 개발자는 구글에게 물어보고, 이것 저것 시도해보며 고통을 받을 것이다.

의존성에 대해 거짓말을 할 경우, 종종 의도와는 다른 결과가 발생한다. 그리고 의존성을 속이는 대부분의 사람들은 클래스 컴포넌트에 익숙하거나, 생명 주기에 집중하여 `useEffect`를 사용한다. 물론, 공식 문서에서도 생명 주기 함수를 예로 들고, 동작하는게 마치 생명 주기 함수의 그것과 같아보이긴 한다.

의존성을 속이면 안되는 이유가 무엇일까? 과연 생명 주기 함수와 `useEffect`가 같은 것일까? `useEffect`를 조금 자세히 알아보면서, 생명 주기 함수와 비교해보도록 하자.

### useEffect === Lifecycle ?

공식 문서에서 `useEffect`를 설명할 때 `side effects`(effect) 와 `cleanup` 라는 단어로 설명한다. "데이터 가져오기, 구독(subscription) 설정하기, 수동으로 리액트 컴포넌트의 DOM을 수정하는 것까지 이 모든 것이 side effects입니다." 라고 한다. 그리고 그 이팩트에 대한 뒷정리를 클린업 이라고 표현하고 있다. 아래 코드를 보자.

```js
componentDidMount() {
  Product.subscribe(this.props.productId);
};

componentDidUpdate(prevProps) {
  if( this.props.productId !== prevProps.productId ) {
    Product.unsubscribe(prevProps.productId);
    Product.subscribe(this.props.productId);
  };
};

componentWillUnmount() {
  Product.unsubscribe(this.props.productId);
};
```

클래스 컴포넌트에서, `productId`를 가지고 특정 상품을 구독하는 코드이다. 컴포넌트 마운트 시점에 상품을 구독하고, `productId`가 변경되면 기존의 상품 구독을 취소하고 다른 상품을 구독한다. 그리고 언마운트시 상품 구독을 취소한다.

상품 구독시에는 당연하게도 해당 구독에 대한 취소가 진행되어야 한다. 여기에서 상품을 구독하는게 이팩트이고, 상품 구독을 취소하는게 클린업이다. 이 코드를 `useEffect`로 작성하면 다음과 같다.

```js
useEffect( () => {
  Product.subscribe(productId);
  return () => Product.unsubscribe(productId);
}, [productId] );
```

처음 상품을 구독(이팩트)하고, `productId`가 변경될 때에 앞의 상품에 대한 구독을 취소하고(클린업), 다시 상품을 구독한다. 그리고 마지막에 구독을 취소한다.

`useEffect`를 사용할 줄 안다면 다 아는 얘기일 것이다. 조금 더 깊이 들어가보자.

잠시 생명 주기 함수를 기억속에서 지우고, 이팩트와 클린업, 의존성 배열에 조금 더 집중해 보자.

이팩트는 생명 주기 함수의 뭐시기가 아니고, 작성되어 있는 의존적인 데이터에 대한 작업이라고 할 수 있다. 클린업은 "이팩트"에 대한 뒷정리 이다. 컴포넌트에 대한 뒷정리, 언마운트 함수 그런게 아니라, 그냥 직전에 일어났던 이팩트(뒷정리 함수를 반환한)에 대한 뒷정리를 클린업이라고 한다.


```js
function CountButton() {
  const [count, setCount] = useState(0);
  
  useEffect( () => {
    console.log(`a ${count}`);
    return () => console.log(`b ${count}`);
  }, [count]);
  
  return (
    <button type='button' onClick={() => setCount(count + 1)}>
      Click!
    </button>
  );
};
```

해당 컴포넌트는 버튼을 누를 때마다 카운트를 증가시키고, 카운트가 변경될 때 마다 카운트를 콘솔에 출력한다. 이 컴포넌트가 마운트되고, 버튼이 두번 눌러진 이후 언마운트 되었다고 하자. 출력 결과는 다음과 같을 것이다.

```
a 0
// click!
b 0
a 1
// click!
b 1
a 2
b 2
```

클래스 컴포넌트에서 생명 주기 함수로 작성하면, 이런 느낌일 것이다.

```js
componentDidMount() {
  console.log(this.state.count);
};

componentDidUpdate(prevProps, prevState) {
  if( prevState.count !== this.state.count ) {
    console.log(prevState.count);
    console.log(this.state.count);
  };
};

componentWillUnmount() {
  console.log(this.state.count);
};
```

여기서 `useEffect`를 그저 생명 주기 함수라고 생각하고 있다고 하자. `count`의 마운트 시점의 초기값과, 언마운트 시점의 마지막 값만을 출력하고 싶어졌다. 클래스 컴포넌트에서는 `componentDidUpdate`만 제거하면 된다. `useEffect`에서는? "아 의존성 배열을 제거하면, 마운트-언마운트 기능을 할 수 있다 그랬어!"

```js
useEffect( () => {
  console.log(`a ${count}`);
  return () => console.log(`b ${count}`);
}, []);
```

`count`의 초기값이 0이고, 버튼이 세번 눌리고 언마운트 되었다. 출력 결과가 어떻게될까?

```
a 0
b 0
```

당연하게도, 3이 출력되는 예제였다면 가져오지 않았다.




`useEffect`는 생명 주기 함수의 `...`역할을 하는게 아니라, 선언된 이팩트를 일으키는 훅이다. 이팩트는 의존성 배열에 있는 데이터가 변경될 때마다 일어난다. 그리고 일어난 이팩트에서 클린업을 반환한다면, 해당 이팩트에 대한 클린업 수행을 보장한다.


// 이팩트와 클린업이 데이터를 어떻게 참조하는지

// 카운트가 변할 때의 각 클린업 예

// 의존성 배열을 비웠을 때의 출력 결과

### useEffect === Lifecycle Method ?

`useEffect`를 설명할 때 주로 생명 주기에 빗대어 표현한다고 했다. 그런데, 어디에서는 완전히 대체가 가능한 것 처럼 설명하기도 한다. 그러면 `useEffect`는 생명 주기 함수로 완전히 대체할 수 있을까? 이전 카운트 컴포넌트의 각 출력에 예상되는 생명 주기 함수를 작성해보자.

```
a 0 // componentDidMount
// click!
b 0 // ??
a 1 // componentDidUpdate
// click!
b 1 // ??
a 2 // componentDidUpdate
b 2 // componentWillUnmount
```

이팩트는 `componentDidMount`와 `componentDidUpdate`라고 생각하면 될 것 같다. 그런데 클린업이 실행되는 `??` 를 무슨 함수라고 표현해야 할까? 굳이 억지로 표현하자면, 이전 `props, state`에 접근할 수 있는 함수들을 얘기할 할 수 있겠다. 아무튼, "이팩트는 `componentDidMount`라고 할 수 있어요!" 나, "반환하는 함수는 무조건 언마운트때 호출되요!" 라고 단정할 수는 없다.

그렇다면 `useEffect`는 생명 주기 함수와 다른거라고 생각하면 될까? 


물론 의존성이 없을 경우에는 빈 배열을 통해 `componentDidMount`, `componentWillUnmount`기능을 구현할 수는 있다. 하지만 의존성을 속이는건, `useEffect`를 의도대로 사용하지 않는 것이다. 그러니까 eslint에도 적용되어 있는 것이고. 의도적인 빈 배열로 마운트-언마운트 기능을 구현하는게 정법이라면, 무엇하러 새로운 단어를 꺼내어 이름을 `useEffect`라고 지었겠는가. `useDidMount`, `useUnmount`나, `useMount` 라는 이름으로 훅을 제공했을 것이다.

## 마무리

`useEffect`를 그저 생명 주기 함수에만 초점을 맞춰 생각하는 사람들을 보며, 내 생각을 정리하기 위해 쓴 글이다. 글을 읽으며 "에이 이런 사람이 어디있어?" 할 수도 있다. 나도 예제 대부분이 조금 극단적이라 생각한다. 하지만 `useEffect`를 검색해보면, 의존성 배열이 비어있지 않은데도 "함수를 반환하면, 컴포넌트가 언마운트 되는 시점에 호출이 됩니다." 라는 글들을 심심찮게 볼 수 있다. 최근에 신입 채용 면접을 진행했는데, 정확히 "생명 주기 함수요." 라고 대답하는 사람도 있었다.

`useEffect`와 생명 주기 함수는 같으면서도 다르다. 이 훅을 그저 생명 주기 함수 용도로 사용하려 했다면, 앞서 말했듯이 생명 주기 함수의 이름을 붙여 제공되었을 것이다. 공식 문서에서도 생명 주기 함수는 그저 예시를 들 뿐, 대부분의 설명은 이팩트와 클린업 이라는 단어로 설명하고 있다. 만약 공식 문서에서 두 키워드를 본 기억이 없다면, 정주행을 추천한다.

[[번역] useEffect 완벽 가이드](https://rinae.dev/posts/a-complete-guide-to-useeffect-ko) 를 꼭 읽어보라고 하고싶다. `useEffect`에 대해 아주 상세하게 설명해주고 있다. 해당 글을 많이 참고하였다.

부디 `useEffect`를 다른 것에 비유하지 말고, 고유한 한 기능으로서 사용하길 바란다.

---
////////////////

```js
useEffect( () => {
  ... // effect
  return () => {
    ... //cleanup
  }
}, [deps] ) // dependencies
```

// 심지어, 의존성 배열이 비어있지 않음에도 "반환하는 함수는 `componentWillUnmount`의 역할을 해요!" 라고 설명하는 글도 봤다.

// 사실, 글 초입부의 `componentDidMount`, `componentWillUnmount` 예는 의존성

// (심지어, 의존성 배열이 비어있지 않음에도 무조건 "반환하는 함수는 `componentWillUnmount`의 역할을 해요!" 라고 설명하는 글도 봤다.). 그럼 이팩트와 클린업을 생명 주기 함수로 완전히 설명할 수 있을까? 반환하는 함수가 무조건 `componentWillUnmount`일까?

