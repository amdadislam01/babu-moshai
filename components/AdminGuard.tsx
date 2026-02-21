'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const userInfo = useSelector((state: RootState) => (state as RootState).auth.userInfo);
    const router = useRouter();

    useEffect(() => {
        if (!userInfo || userInfo.role !== 'admin') {
            router.push('/login');
        }
    }, [userInfo, router]);

    if (!userInfo || userInfo.role !== 'admin') {
        return null;
    }

    return <>{children}</>;
}
