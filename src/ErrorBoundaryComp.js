import React from "react";

/**
 * Error boundary is class component always...
 * it will catch JS error occuring in constructor, render and life cycle method.
 * by default it is disabled in local but it will enable in PROD...
 * for seeing in local, click on cross button which is present at
 * right-top.
 *
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
