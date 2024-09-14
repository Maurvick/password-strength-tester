import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('PasswordStrengthTesterComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent], // Import the standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial change detection
  });

  it('should display all sections as gray when the password is empty', () => {
    component.password = '';
    component.checkPasswordStrength();
    fixture.detectChanges(); // Update DOM

    const sections = fixture.nativeElement.querySelectorAll('.sections div');
    expect(sections[0].classList.contains('gray')).toBeTrue();
    expect(sections[1].classList.contains('gray')).toBeTrue();
    expect(sections[2].classList.contains('gray')).toBeTrue();
  });

  it('should display the first section as red and others gray for weak passwords', () => {
    component.password = 'short';
    component.checkPasswordStrength();
    fixture.detectChanges(); // Update DOM

    const sections = fixture.nativeElement.querySelectorAll('.sections div'); // As for css style
    expect(sections[0].classList.contains('red')).toBeTrue();
    expect(sections[1].classList.contains('red')).toBeTrue();
    expect(sections[2].classList.contains('red')).toBeTrue();
  });

  it('should display two yellow sections for a medium strength password', () => {
    component.password = 'Password1';
    component.checkPasswordStrength();
    fixture.detectChanges(); // Update DOM

    const sections = fixture.nativeElement.querySelectorAll('.sections div');
    expect(sections[0].classList.contains('yellow')).toBeTrue();
    expect(sections[1].classList.contains('yellow')).toBeTrue();
    expect(sections[2].classList.contains('gray')).toBeTrue();
  });

  it('should display all green sections for a strong password', () => {
    component.password = 'Password1!';
    component.checkPasswordStrength();
    fixture.detectChanges(); // Update DOM

    const sections = fixture.nativeElement.querySelectorAll('.sections div');
    sections.forEach((section: HTMLElement) => {
      expect(section.classList.contains('green')).toBeTrue();
    });
  });
});
