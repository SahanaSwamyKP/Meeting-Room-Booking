import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Logic to log out the user, e.g., clear session, tokens, etc.
    console.log('User logged out');
    // Redirect to login page or homepage
  this.router.navigate(['/login']);
  }

}
