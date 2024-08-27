import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSlotsComponent } from './room-slots.component';

describe('RoomSlotsComponent', () => {
  let component: RoomSlotsComponent;
  let fixture: ComponentFixture<RoomSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomSlotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
