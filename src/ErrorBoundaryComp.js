import React from "react";

/**
 * Error boundary is always a class component ...
 * it will catch JS error occuring in constructor, render and life cycle method.
 * by default it is disabled in local but it will enable in PROD...
 * for seeing in local, click on cross button which is present at
 * right-top.
 *
 */

/**
 * Obviously, the error we create in the code can certainly been handled with PropTypes or 
 * TypeScript, however we are aware runtime error happens all the time and we are going to 
 * deal with it using the two approaches stated.
 * 1st id try and catch and 2nd is ErrorBoundaries.
 * 
 * Read this:- https://dev.to/edemagbenyo/handle-errors-in-react-components-like-a-pro-l7l#:~:text=Error%20boundaries%20are%20React%20components,the%20whole%20tree%20below%20them.
 */

/**
 * React Error Boundary Error boundaries are React components that catch JavaScript errors 
 * anywhere in their child component tree, log those errors, and display a fallback UI instead 
 * of the component tree that crashed.
 * Error boundaries catch errors during rendering, in lifecycle methods, and in constructors 
 * of the whole tree below them. 
 * As at React 17.0.2, 
 * Error Boundary works only in "Class component" and It must implement 
 * "static getDerivedStateFromError() or componentDidCatch()"
 * But In order to use Error Boundary in Functional Component, use react-error-boundary library.
 */
export default class ErrorBoundaryComp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", fontSize: "40px", margin: "40px" }}>
          Something is going wrong..!!!(Example of error boundary)
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
