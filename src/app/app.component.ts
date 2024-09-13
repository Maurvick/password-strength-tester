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
    if (password.length > 0) {
      this.password = password;
      this.scanStr(this.password);
    }
  }

  scanStr(str: string) {
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const charCode = str.charCodeAt(i);
      if (char[i].toLowerCase() !== char[i].toUpperCase()) {
        this.hasLetters = true;
      }
      if (this.isDigit(charCode)) {
        this.hasDigits = true;
      }
    }
  }

  isDigit(charCode: number) {
    return charCode >= 48 && charCode <= 57;
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
    if (this.hasLetters && this.hasDigits) {
      return 'medium';
    }
    if (this.hasLetters || this.hasDigits || this.hasSymbols) {
      return 'easy';
    }
    return '';
  }
}
