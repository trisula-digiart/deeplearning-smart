import React from 'react';
import { Zap, CheckCircle2, AlertCircle, X } from 'lucide-react';

/**
 * TRISULAPROMPT - Toast Notification Component
 * Floating feedback alert banner for system feedback and engine notifications.
 * 
 * @param {Object} props
 * @param {Object|string|null} props.toast - Toast data object { message: string, type?: 'info'|'success'|'error' } or string message
 * @param {Function} [props.onClose] - Optional callback function to dismiss toast
 */
export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const message = typeof toast === 'string' ? toast : toast.message;
  const type = typeof toast === 'object' && toast.type ? toast.type : 'info';

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200',
          icon: CheckCircle2,
          iconColor: 'text-emerald-400'
        };
      case 'error':
        return {
          bg: 'bg-rose-950/90 border-rose-500/40 text-rose-200',
          icon: AlertCircle,
          iconColor: 'text-rose-400'
        };
      case 'info':
      default:
        return {
          bg: 'bg-indigo-950/90 border-indigo-500/40 text-indigo-200',
          icon: Zap,
          iconColor: 'text-amber-400'
        };
    }
  };

  const style = getStyles();
  const IconComponent = style.icon;

  return (
    <div className="fixed top-5 right-5 z-50 transition-all duration-300">
      <div
        className={`px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md flex items-center gap-3 max-w-md ${style.bg}`}
      >
        <div className="p-1 rounded-lg bg-slate-900/50 shrink-0">
          <IconComponent className={`w-5 h-5 ${style.iconColor}`} />
        </div>
        <span className="text-xs font-semibold leading-snug flex-1">
          {message}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
