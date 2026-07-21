import React from 'react';
import { Zap, CheckCircle2, AlertCircle, X } from 'lucide-react';

/**
 * TRISULAPROMPT - Toast Notification Component v2.5
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Module: UI Alert Banner for System Feedback & AI Engine Notifications
 * 
 * @param {Object} props
 * @param {Object|string|null} props.toast - Data toast object { message: string, type?: 'info'|'success'| me'error' } or string message
 * @param {Function} [props.onClose] - Callback function to dismiss toast
 */
export default function Toast({ toast, onClose }) {
  // Return null if no active toast notification
  if (!toast) return null;

  const message = typeof toast === 'string' ? toast : toast.message;
  const type = typeof toast === 'object' && toast.type ? toast.type : 'info';

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200 shadow-emerald-900/30',
          icon: CheckCircle2,
          iconColor: 'text-emerald-400'
        };
      case 'error':
        return {
          bg: 'bg-rose-950/90 border-rose-500/40 text-rose-200 shadow-rose-900/30',
          icon: AlertCircle,
          iconColor: 'text-rose-400'
        };
      case 'info':
      default:
        return {
          bg: 'bg-indigo-950/90 border-indigo-500/40 text-indigo-200 shadow-indigo-900/30',
          icon: Zap,
          iconColor: 'text-amber-400'
        };
    }
  };

  const style = getStyles();
  const IconComponent = style.icon;

  return (
    <div className="fixed top-5 right-5 z-50 transition-all duration-300 animate-fadeIn">
      <div
        className={`px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md flex items-center gap-3 max-w-md ${style.bg}`}
      >
        <div className="p-1.5 rounded-xl bg-slate-900/60 shrink-0 border border-slate-800">
          <IconComponent className={`w-5 h-5 ${style.iconColor}`} />
        </div>
        <span className="text-xs font-semibold leading-snug flex-1">
          {message}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition hover:bg-slate-800/60"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
