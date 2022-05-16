import { animate, transition, style, trigger } from '@angular/animations';

export const chartAnimation = trigger('chartAnimation', [

  transition('*=>*', [
    style({ opacity: 0 }),
    animate('1000ms', style({opacity: 1 })),
  ]),
]);
