// DISABLED: import from 'sonner';
import { ReactNode } from 'react';

interface ToastOptions {
    duration?: number;
}

export const showSuccessToast = (title: string, message?: string, options?: ToastOptions) => {
    toast(
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 bg-[#10b981] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <p className="font-semibold text-[14px] text-gray-900">{title}</p>
            </div>
            {message && (
                <p className="text-[13px] text-gray-600 leading-[1.4] pl-[30px]">{message}</p>
            )}
        </div>,
        {
            duration: options?.duration || 4000,
            unstyled: true,
            className: 'bg-white shadow-lg',
            style: {
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
            },
        } as any
    );
};

export const showErrorToast = (title: string, message?: string, options?: ToastOptions) => {
    toast(
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 bg-[#ef4444] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <p className="font-semibold text-[14px] text-gray-900">{title}</p>
            </div>
            {message && (
                <p className="text-[13px] text-gray-600 leading-[1.4] pl-[30px]">{message}</p>
            )}
        </div>,
        {
            duration: options?.duration || 4000,
            unstyled: true,
            className: 'bg-white shadow-lg',
            style: {
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
            },
        } as any
    );
};

export const showInfoToast = (title: string, message?: string, options?: ToastOptions) => {
    toast(
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 bg-[#3b82f6] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="font-semibold text-[14px] text-gray-900">{title}</p>
            </div>
            {message && (
                <p className="text-[13px] text-gray-600 leading-[1.4] pl-[30px]">{message}</p>
            )}
        </div>,
        {
            duration: options?.duration || 4000,
            unstyled: true,
            className: 'bg-white shadow-lg',
            style: {
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
            },
        } as any
    );
};

export const showWarningToast = (title: string, message?: string, options?: ToastOptions) => {
    toast(
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 bg-[#f59e0b] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="font-semibold text-[14px] text-gray-900">{title}</p>
            </div>
            {message && (
                <p className="text-[13px] text-gray-600 leading-[1.4] pl-[30px]">{message}</p>
            )}
        </div>,
        {
            duration: options?.duration || 4000,
            unstyled: true,
            className: 'bg-white shadow-lg',
            style: {
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
            },
        } as any
    );
};
