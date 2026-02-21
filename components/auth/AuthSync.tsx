'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '@/lib/features/auth/authSlice';
import { RootState } from '@/lib/store';

export default function AuthSync() {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => (state as RootState).auth.userInfo);

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            // Check if Redux state is already in sync to avoid infinite loops
            const sessionUser = session.user as any;
            if (!userInfo || userInfo._id !== sessionUser.id) {
                dispatch(setUserInfo({
                    _id: sessionUser.id,
                    name: sessionUser.name || '',
                    email: sessionUser.email || '',
                    role: sessionUser.role || 'user',
                    token: sessionUser.accessToken || '',
                }));
            }
        } else if (status === 'unauthenticated' && userInfo) {
            // Clear Redux state if session is lost
            dispatch(setUserInfo(null));
        }
    }, [session, status, dispatch, userInfo]);

    return null;
}
