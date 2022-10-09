import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @ViewChild('selectElement') selectElement: ElementRef | undefined;

  @Input() options: [string, string][] = [];
  @Input() showedOptions: string[] = [];
  @Input() disabledValue: string = '';
  @Input()
  get value(): string {
    return this.currentValue;
  }
  set value(v: string) {
    this.currentValue = v;
  }

  @Output() onChange = new EventEmitter<string>();

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        !this.selectElement?.nativeElement.contains(e.target) &&
        this.isDropdownOpen
      ) {
        this.closeDropdown();
      }
    });
  }

  public currentValue = '';
  public isDropdownOpen = false;

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  select(v: string) {
    if (v !== this.disabledValue) {
      this.currentValue = v;
      this.closeDropdown();
      this.onChange.emit(this.currentValue);
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  get showedValue(): string {
    return this.options.filter((opt) => opt[0] === this.currentValue)[0][1];
  }
}
