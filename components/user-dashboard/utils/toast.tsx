// DISABLED: import from 'sonner';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

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
        }
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
        }
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
        }
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
        }
    );
};

export const showConfirmToast = (title: string, message: string, onConfirm: () => void, options?: ToastOptions) => {
    let toastId: string | number;
    toastId = toast(
        <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 bg-[#f59e0b] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="font-semibold text-[14px] text-gray-900">{title}</p>
            </div>
            <p className="text-[13px] text-gray-600 leading-[1.4] pl-[30px]">{message}</p>
            <div className="flex gap-2 pl-[30px]">
                <button
                    onClick={() => { toast.dismiss(toastId); onConfirm(); }}
                    className="flex-1 py-1.5 rounded-lg bg-[#ef4444] text-white text-[13px] font-semibold"
                >
                    Confirmar
                </button>
                <button
                    onClick={() => toast.dismiss(toastId)}
                    className="flex-1 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-[13px] font-semibold"
                >
                    Cancelar
                </button>
            </div>
        </div>,
        {
            duration: options?.duration || 8000,
            unstyled: true,
            className: 'bg-white shadow-lg',
            style: {
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
            },
        }
    );
};

export const showCallToast = () => {
    toast(
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 bg-[#10b981] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </div>
                <p className="font-semibold text-[14px] text-gray-900">Chamada agendada</p>
            </div>
            <p className="text-[13px] text-gray-600 leading-[1.4] pl-[30px]">Um dos nossos especialistas vai ligar-te dentro de momentos</p>
        </div>,
        {
            duration: 5000,
            unstyled: true,
            className: 'bg-white shadow-lg',
            style: {
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
            },
        }
    );
};
