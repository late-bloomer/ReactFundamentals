import React, {
  useState,
  useEffect,
  useRef,
  isValidElement,
  useMemo,
  useCallback,
} from "react";

/**
 * Imp:- In one functional component, Multiple use effect can be present and
 * the execution of that effect will be happen in the order of position or in the
 * order in which they are written...
 */

/**
 * 
 * For proper understanding of useMemo and useCallback, kindly read below webpage
 * https://www.joshwcomeau.com/react/usememo-and-usecallback/
 * 
 */

export default function ReactHooksExample(props) {
  const [counter, setCounter] = useState(0);
  const { textMsg } = props;

  let myInputRef = useRef(null);

  /***** behaves like ComponentDidUpdate (infinite loop) ****/
  // useEffect(()=>{
  //     setCounter(counter+1)
  // })

  /***** behaves like ComponentDidMount i.e, update DOM once only ****/
  useEffect(() => {
    setInterval(() => {
      setCounter(counter + 1);
    }, 500);
  }, []);

  /***** behaves like ComponentDidUpdate (if the state values is changed)
   * and so we have to explicitly mention the variable which is changed, i.e
   * which state is changed in empty array in useEffect.
   */
  // useEffect(()=>{
  //     setInterval(()=>{
  //         setCounter(counter+1)
  //     }, 500)
  // },[counter])

  /***** behaves like ComponentDidUpdate (if the state values is changed)
   * and no need to explicitly mention the variable which is changed like above,
   * i.e, which state is changed in empty array in useEffect but use
   * setCounter((preState)=>preState+1)
   */
  //  useEffect(()=>{
  //     setInterval(()=>{
  //         setCounter((preCounterValue)=>preCounterValue+1)
  //     }, 500)
  // },[])

  /***** behaves like ComponentWillUnmount..
   * So if we are going out of this UI/Component, we should clear the
   * setInterval like we do in ComponentWillUnmount otherwise
   * it will run and memory will leak...
   */
  //  useEffect(()=>{
  //     var timer = setInterval(()=>{
  //         setCounter((preCounterValue)=>preCounterValue+1)
  //     }, 500)
  //     return ()=>{
  //      clearInterval(timer)
  //     }
  // })

  /**
   * How to get previous props in useEffect.
   * The useRef Hook can also be used to keep track of previous state or previous props values.
   * This is because we are able to persist useRef values between renders.
   * refer - https://www.w3schools.com/react/react_useref.asp
   */

  // declare usePrevious hook(It is an example of custom hook..)
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  // call usePrevious hook on component state variables to get previousState
  let prevTextMsg = usePrevious(textMsg);

  // useEffect hook to detect change of props variables
  useEffect(() => {
    if (prevTextMsg !== textMsg) {
      console.log(
        "Not the same...!!!!...prevTextMsg->>" +
          prevTextMsg +
          "<--textMsg-->" +
          textMsg
      );
    }
  }, [textMsg]);

  // useRef hook use to focus on th element
  const onClickHand = () => {
    myInputRef.current.focus();
  };

  return (
    <>
      <div style={{ marginLeft: "24px" }}>{counter}</div>
      <div style={{ marginLeft: "24px" }}>textmsg: {textMsg}</div>
      <br></br>
      <br></br>
      <div>useRef hook</div>
      <div>
        <input id="my_input" ref={myInputRef} />
        <button onClick={onClickHand}>click here</button>
      </div>
      <br></br>
      <br></br>
      <ExampleUseMemoHook />
      <ExampleUseCallbackHook />
      <CustomHooksComponentExample />
    </>
  );
}

/**
 * Custom hooks example
 */

function useCounter(val) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setCounter(val);
  }, []);
  return {
    counter,
    increment: function () {
      setCounter((preVal) => preVal + 1);
    },
    decrement: function () {
      setCounter((preVal) => preVal - 1);
    },
  };
}
//**** Actually we need to write like this, plz learn *******/
// function useStateCustom(initial) {
//   let value = initial;
//   function setValue(newVal) {
//     console.log(newVal);
//     value = newVal;
//   }
//   return [value, setValue];
// }
function useStateCustom(initial) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(initial);
  }, []);
  function setVal(newVal) {
    setValue(newVal);
  }
  return [value, setVal];
}
function CustomHooksComponentExample() {
  const { increment, decrement, counter } = useCounter(3);
  const [value, setVal] = useStateCustom(9);
  const handleClick = () => {
    setVal(value + 1);
  };
  return (
    <div className="CustomHooksComponentExample">
      CustomHooksComponentExample : {counter}
      <br></br>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <br></br>
      {value}
      <br></br>
      <button onClick={handleClick}>increase value of value</button>
    </div>
  );
}

/**
 * UseMemo Example
 */

/**
 * 
 * This:
 * React.useCallback(function helloWorld(){}, []);
 * ..Is functionally equivalent to this:
 * React.useMemo(() => function helloWorld(){}, []);
 */
function ExampleUseMemoHook(props) {
  const [timer1, setTimer1] = useState(0);
  const [timer2, setTimer2] = useState(0);

  function onClickHand() {
    setTimer1((preTimer1) => preTimer1 + 1);
  }

  function onClickHand2() {
    setTimer2((preTimer2) => preTimer2 + 1);
  }

  /**
   * Observe carefully, it is taking time to Increment when we click on Increment1
   * and when we click on Increment2, then again it is taking time to increment the
   * second timer because when react renders the dom then execute the isEven function
   * which is expensive, so this is happening. so here useMemo hook come into rescue.
   */
  // function isEven() {
  //     let counter = 0;
  //     while (counter < 2000000000) {
  //         counter++;
  //     }
  //     if (timer1 % 2 === 0)
  //         return true
  //     else
  //         return false
  // }

  // useMemo hooks...... "useMemo" returns value but "useCallback" returns function
  const isEven = useMemo(() => {
    let counter = 0;
    while (counter < 2000000000) {
      counter++;
    }
    if (timer1 % 2 === 0) return true;
    else return false;
  }, [timer1]);

  return (
    <>
      <div>
        <span style={{ marginRight: "24px" }}>{timer1}</span>
        {/* <span style={{marginRight:'24px'}}>{isEven() ? 'EVEN' : 'ODD'}</span> */}
        <span style={{ marginRight: "24px" }}>{isEven ? "EVEN" : "ODD"}</span>
        <mark>Observe carefully, it is taking time to Increment..</mark>
      </div>
      <button onClick={onClickHand}>Increment1</button>
      <br></br>
      <br></br>
      <div>{timer2}</div>
      <button onClick={onClickHand2}>Increment2</button>
    </>
  );
}

/**
 * UseCallback Example
 */
function ExampleUseCallbackHook(props) {
  const [data, setData] = useState("");
  const [toggle, setToggle] = useState(true);

  function expensiveFunction() {
    for (let i = 0; i < 30000000; ) {
      i++;
    }
    return "This is really expensive....";
  }

  const getExpensive = useCallback(() => {
    return expensiveFunction();
  }, [data]);

  function onClickToggle() {
    setToggle((prev) => !prev);
  }

  return (
    <>
      <ChildComp getExpensive={getExpensive} />
      <button onClick={onClickToggle}>Click me</button>
      <div>{toggle ? "true" : "false"}</div>
    </>
  );
}

function ChildComp({ getExpensive }) {
  useEffect(() => {
    console.log("expensive function called");
  }, [getExpensive]);
  return <div>{getExpensive()}</div>;
}
