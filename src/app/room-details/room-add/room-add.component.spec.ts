import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAddComponent } from './room-add.component';

describe('RoomAddComponent', () => {
  let component: RoomAddComponent;
  let fixture: ComponentFixture<RoomAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
