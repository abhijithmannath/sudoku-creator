import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuViewComponent } from './sudoku-view.component';

describe('SudokuViewComponent', () => {
  let component: SudokuViewComponent;
  let fixture: ComponentFixture<SudokuViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SudokuViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
