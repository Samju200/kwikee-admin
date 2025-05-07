import { InjectionToken } from '@angular/core';
import { Notyf } from 'notyf';

export const NOTYF = new InjectionToken<Notyf>('NotyfToken');

export function notyfFactory(): Notyf {
  return new Notyf({
    duration: 5000,
    position: {x: 'right' , y: 'top'},
    dismissible: true,
    ripple: true,
    types: [
        {
            type: 'error',
            className: 'text--regular',
            dismissible: true,
        },
        {
            type: 'success',
            className: 'text--regular',
            dismissible: true,
        },
        {
            type: 'warning',
            className: 'text--regular',
            dismissible: true,
        },
    ]
  });
}