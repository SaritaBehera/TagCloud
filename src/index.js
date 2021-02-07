import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './ErrorBoundary';
import TagContainer from './TagContainer';
import './index.css';

/**
 * Parent container with error boundaries as fallback UI
 */
class Container extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <TagContainer />
            </ErrorBoundary>

        )
    }
}

/* Render the tag container component to the parent
 */
ReactDOM.render(
    <Container/>,
    document.getElementById('tag-cloud')
);
