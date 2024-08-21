import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSingupComponent } from './login.component';

describe('LoginSingupComponent', () => {
  let component: LoginSingupComponent;
  let fixture: ComponentFixture<LoginSingupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSingupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
