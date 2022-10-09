import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @ViewChild('selectElement') selectElement: ElementRef | undefined;

  @Input() options: [string, string][] = [];
  @Input() showedOptions: string[] = [];
  @Input() value: string = '';
  @Input() disabledValue: string = '';

  @Output() onChange = new EventEmitter<string>();

  constructor(
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e:Event) => {
      if (!this.selectElement?.nativeElement.contains(e.target) && this.isDropdownOpen) {
        this.closeDropdown()
      }
    })
  }

  public currentValue = '';
  public isDropdownOpen = false;

  ngOnInit(): void {
    this.currentValue = this.value;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  select(value: string) {
    this.currentValue = value;
    this.closeDropdown();
    this.onChange.emit(this.currentValue);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  get showedValue(): string {
    return this.options.filter(opt => opt[0] === this.currentValue)[0][1]
  }
}
