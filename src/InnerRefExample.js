import React, {Component} from 'react'

export class InnerRefExample extends Component{
    constructor(props){
        super(props)
    }

    clickHandler = () =>{
        this.props.innerRef.current.focus() 
    }

    render(){
        return(
            <input type='submit' value='click me !!'
                    onClick={this.clickHandler} />
        )
    }
}