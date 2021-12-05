import React from 'react'


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