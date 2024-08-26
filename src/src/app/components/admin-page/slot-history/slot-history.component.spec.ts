import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotHistoryComponent } from './slot-history.component';

describe('SlotHistoryComponent', () => {
  let component: SlotHistoryComponent;
  let fixture: ComponentFixture<SlotHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
