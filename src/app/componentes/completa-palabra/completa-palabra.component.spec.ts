import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletaPalabraComponent } from './completa-palabra.component';

describe('CompletaPalabraComponent', () => {
  let component: CompletaPalabraComponent;
  let fixture: ComponentFixture<CompletaPalabraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletaPalabraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletaPalabraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
