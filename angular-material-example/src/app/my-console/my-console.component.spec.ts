import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConsoleComponent } from './my-console.component';

describe('MyConsoleComponent', () => {
  let component: MyConsoleComponent;
  let fixture: ComponentFixture<MyConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
