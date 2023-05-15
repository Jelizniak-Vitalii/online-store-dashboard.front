import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() readonly: boolean = false;
  @Input() placeholder: string = '';
  @Input() title: string = '';
  @Input() type: string = 'text';
  @Input() validationMessage: string = '';
  @Input() errorMessage: string = '';

  @Output() inputValueChange: EventEmitter<string | number> = new EventEmitter();

  formControl: FormControl = new FormControl('');

  constructor(
    private injector: Injector
  ) {}

  ngOnInit() {
    const ngControl = this.injector.get(NgControl);
    this.formControl = ngControl.control as FormControl;
    this.formControl.valueChanges.subscribe(value => {
      this.registerOnChange(value);
      this.inputValueChange.emit(value);
    });
  }

  private onTouched = () => {};

  private onChange: (value: string | number) => void = () => {};

  registerOnChange(onChange: (value: string | number) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  writeValue(obj: string | number): void {
    this.formControl.setValue(obj, { emitEvent: false } );
  }
}
