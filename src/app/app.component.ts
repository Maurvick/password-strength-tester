import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import {
  DIGITS,
  SYMBOLS,
  UPPER_LOWER_CASE_LETTERS,
} from './constants/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  hasLetters: boolean = false;
  hasSymbols: boolean = false;
  hasDigits: boolean = false;

  password: string = '';

  section1: string = 'gray';
  section2: string = 'gray';
  section3: string = 'gray';

  constructor() {}

  onPasswordChange(e: Event): void {
    this.password = (e.target as HTMLInputElement).value;
    this.checkPasswordStrength();
  }

  checkPasswordStrength(): void {
    // Reset flags for new string
    this.resetFlags();
    // Use flags for better readability and easier debugging
    if (this.containsLetters(this.password)) {
      this.hasLetters = true;
    }
    if (this.containsDigits(this.password)) {
      this.hasDigits = true;
    }
    if (this.containsSymbols(this.password)) {
      this.hasSymbols = true;
    }
    // Call getPasswordStrength to update sections and text after every change
    this.getPasswordStrength();
  }

  // Define constants for better readability and performance
  containsLetters(str: string): boolean {
    return UPPER_LOWER_CASE_LETTERS.some((letter) => str.includes(letter));
  }

  containsDigits(str: string): boolean {
    return DIGITS.some((number) => str.includes(number));
  }

  containsSymbols(str: string): boolean {
    return SYMBOLS.some((symbol) => str.includes(symbol));
  }

  resetFlags(): void {
    this.hasLetters = false;
    this.hasSymbols = false;
    this.hasDigits = false;
  }

  getPasswordStrength(): string {
    let passwordLength: number = this.password.length;

    if (passwordLength === 0) {
      this.setSectionColor('gray', 'gray', 'gray');
      return '';
    }

    if (passwordLength < 8) {
      this.setSectionColor('red', 'red', 'red');
      return 'weak';
    }

    // This need to be on top because it requires all flags enabled and could be ignored
    if (this.hasLetters && this.hasDigits && this.hasSymbols) {
      this.setSectionColor('green', 'green', 'green');
      return 'strong';
    }

    if (
      (this.hasLetters && this.hasSymbols) ||
      (this.hasLetters && this.hasDigits) ||
      (this.hasDigits && this.hasSymbols)
    ) {
      this.setSectionColor('yellow', 'yellow', 'gray');
      return 'medium';
    }

    if (this.hasLetters || this.hasDigits || this.hasSymbols) {
      this.setSectionColor('red', 'gray', 'gray');
      return 'easy';
    }

    return '';
  }

  setSectionColor(section1: string, section2: string, section3: string): void {
    this.section1 = section1;
    this.section2 = section2;
    this.section3 = section3;
  }
}
