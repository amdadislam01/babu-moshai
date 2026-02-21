'use client';

import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { SessionProvider } from 'next-auth/react';
import AuthSync from '@/components/auth/AuthSync';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Provider store={store}>
                <AuthSync />
                {children}
            </Provider>
        </SessionProvider>
    );
}
