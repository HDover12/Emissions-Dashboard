import { animate, transition, style, trigger, query, animateChild } from "@angular/animations";

const ShakeAnimation = [
  style({ transform: 'rotate(0)' }),
  animate('0.1s', style({ transform: 'rotate(2deg)' })),
  animate('0.1s', style({ transform: 'rotate(-2deg)' })),
  animate('0.1s', style({ transform: 'rotate(2deg)' })),
  animate('0.1s', style({ transform: 'rotate(0)' })),
];

export const QueryShake = [
  trigger('container', [
    transition(':enter, :leave', [query('@*', animateChild())]),
  ]),
];