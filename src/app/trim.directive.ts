import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTrim]'
})
export class TrimDirective {

  constructor(private el: ElementRef) { }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string): void {
    this.el.nativeElement.value = value.trim();

  }
}
