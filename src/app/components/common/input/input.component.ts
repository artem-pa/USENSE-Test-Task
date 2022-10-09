import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input()
  get value(): string {
    return this.currentValue;
  }

  set value(v: string) {
    if (v !== this.currentValue) {
      this.currentValue = v;
    }
  }

  @Output() onChange = new EventEmitter<string>();

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (
      // Allow navigation keys
      this.navigationKeys.indexOf(e.key) > -1 ||

      //Allow decimal separator
      (e.key === '.' && !this.currentValue.includes('.')) ||

      // Allow key combinations
      (e.key === 'a' && e.ctrlKey === true) || // Ctrl+A (Windows)
      (e.key === 'c' && e.ctrlKey === true) || // Ctrl+C (Windows)
      (e.key === 'v' && e.ctrlKey === true) || // Ctrl+V (Windows)
      (e.key === 'x' && e.ctrlKey === true) || // Ctrl+X (Windows)
      (e.key === 'a' && e.metaKey === true) || // Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Cmd+X (Mac)
    ) {
      return;
    }

    if (e.key === '' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  currentValue = '';
  navigationKeys = ['Delete', 'Backspace', 'ArrowLeft', 'ArrowRight'];

  constructor() {}

  oninput() {
    if (this.currentValue === '') {
      this.currentValue = '0';
    }
    this.onChange.emit(this.currentValue);
  }
}
