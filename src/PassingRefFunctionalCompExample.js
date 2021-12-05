import React from 'react'

export function PassingRefFunctionalCompExample(props){

    function clickHandler(){
        props.innerRef.current.focus() 
    }
    return(
      <React.Fragment>
          <input type='button' value='click me' onClick={clickHandler} />
      </React.Fragment>
    )
}