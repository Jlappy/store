import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;
  matchPasswords = (group: FormGroup) => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  };

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.form = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        role: ['user', Validators.required],
      },
      { validators: this.matchPasswords }
    );

  }

  onSubmit() {
    const { username, password, confirmPassword, role } = this.form.value;

    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    this.auth.register({ username, password, role }).subscribe({
      next: () => {
        alert('Đăng ký thành công!');
        this.router.navigate(['/login']);
      },
      error: () => alert('Đăng ký thất bại!')
    });

  }

}


