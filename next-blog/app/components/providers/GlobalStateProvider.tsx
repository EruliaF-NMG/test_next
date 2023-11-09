'use client';

import { Provider } from 'react-redux';
import { store } from '../../../global-state/store';

export const GlobalStateProvider=({ children }) => {
    return (
        <Provider store={store}>
            { children }
        </Provider>
    )
}