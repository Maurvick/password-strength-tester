import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

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

  hasLettersAndSymbols: boolean = false;
  hasLettersAndDigits: boolean = false;
  hasDigitsAndSymbols: boolean = false;

  hasLettersSymbolsAndNumbers: boolean = false;

  password: string = '';

  constructor() {}

  onPasswordChange(password: string): void {
    this.password = password;
    this.scanStr(this.password);
  }

  scanStr(str: string) {
    if (str) {
      // reset flags when string is changed
      this.resetFlags();
    }
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const charCode = str.charCodeAt(i);
      if (char.toLowerCase() !== char.toUpperCase()) {
        this.hasLetters = true;
      }
      if (this.isDigit(charCode)) {
        this.hasDigits = true;
      }
      if (this.isSymbol(char)) {
        this.hasSymbols = true;
      }
    }
  }

  isDigit(charCode: number) {
    // has digits from 0-9
    return charCode >= 48 && charCode <= 57;
  }

  isSymbol(char: string) {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return symbolRegex.test(char);
  }

  resetFlags() {
    this.hasLetters = false;
    this.hasSymbols = false;
    this.hasDigits = false;

    this.hasLettersAndSymbols = false;
    this.hasLettersAndDigits = false;
    this.hasDigitsAndSymbols = false;

    this.hasLettersSymbolsAndNumbers = false;
  }

  getPasswordStrength(): string {
    if (this.hasLetters && this.hasDigits && this.hasSymbols) {
      return 'strong';
    }
    if (
      (this.hasLetters && this.hasSymbols) ||
      (this.hasLetters && this.hasDigits) ||
      (this.hasDigits && this.hasSymbols)
    ) {
      return 'medium';
    }
    if (this.hasLetters || this.hasDigits || this.hasSymbols) {
      return 'easy';
    }
    return '';
  }
}
