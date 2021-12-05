import React, { Component, Fragment } from 'react'
import {InnerRefExample} from './InnerRefExample'
import {PassingRefFunctionalCompExample} from './PassingRefFunctionalCompExample'

/**
 * ref and forwarding ref are used to take reference of HTML or jsx
 * or DOM element in react but over use of ref is not recommended in
 * react
 */

export default class ExampleRefAndForwardingRef extends Component {
    constructor(props) {
        super(props)
        this.textRef = React.createRef();
        this.text2Ref = React.createRef();
        this.text3Ref = React.createRef();
        this.text4Ref = React.createRef();
    }

    clickHandler = () => {
        this.textRef.current.focus()
        // focusing on text to enter when button is clicked.
    }

    render() {
        return (
            <Fragment>
                <p>Example of ref.....</p>
                <input type='text' ref={this.textRef} />
                <input type='submit' value='click me'
                    onClick={this.clickHandler} />
                <br></br>
                <br></br>
                <p>Example of Inner Ref.....</p>
                <input type='text' ref={this.text2Ref} />
                <InnerRefExample innerRef={this.text2Ref}/>
                <br></br>
                <br></br>
                <p>Example of passing Ref to functional component.....</p>
                <input type='text' ref={this.text3Ref} />
                <PassingRefFunctionalCompExample innerRef={this.text3Ref}/>
                <br></br>
                <br></br>
                <p>Example of forwardingRef to use ref in functional component.....</p>
                <input type='text' ref={this.text4Ref} />
                <ForwardingRefExample ref={this.text4Ref}/>
            </Fragment>
        )
    }
}


/**
 * ForwardingRefExample is an example of functional component and how we can use ref 
 * inside it using forwardRef...
 * it will take two param (props and reference)
 */
const ForwardingRefExample = React.forwardRef((props, ref)=>{

    function buttonClickHandler(){
      ref.current.focus()
    }
    return(
        <button onClick={buttonClickHandler} >Click me sir !!!</button>
    )
});

