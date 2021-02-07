import React from 'react';

/**
 * Error boundaries for error handling
 * catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>System encountered an error. Please reload the page and try again!</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;