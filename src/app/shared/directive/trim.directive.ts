import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appTrim]'
})
export class TrimDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('blur', ['$event.target.value'])
  public onBlur(value: string): void {
    this.el.nativeElement.value = value.trim();

  }
}
