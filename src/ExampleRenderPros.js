import React from 'react'

// Render props - Be careful when using Render Props with React.PureComponent
/**
 * Using a render prop can negate the advantage that comes from using React.PureComponent 
 * if you create the function inside a render method. This is because the shallow prop 
 * comparison will always return false for new props, and each render in this case will 
 * generate a new value for the render prop.
 */
export default class ExampleRenderPros extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                {this.props.render("This is an example of render props...")}
                {this.props.children}
            </div>
        )
    }
}