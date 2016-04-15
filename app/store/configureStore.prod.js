import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import createStorage from 'lib/storage';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            createStorage(),
            applyMiddleware(
                thunk
            )
        )
    );
}
