import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import DevTools from 'containers/DevTools';
import { Iterable } from 'immutable';
import createStorage from 'lib/storage';

function stateTransformer(state) {
    return Object.keys(state).reduce((newState, key) => {
        const value = state[key];

        newState[key] = Iterable.isIterable(value) ? value.toJS() : value;

        return newState;
    }, {});
}

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            createStorage(),
            applyMiddleware(
                thunk,
                createLogger({ stateTransformer })
            ),
            DevTools.instrument()
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
