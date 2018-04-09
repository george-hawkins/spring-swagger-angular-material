import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDialogOpenerComponent } from './my-dialog-opener.component';

describe('MyDialogOpenerComponent', () => {
  let component: MyDialogOpenerComponent;
  let fixture: ComponentFixture<MyDialogOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDialogOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDialogOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
