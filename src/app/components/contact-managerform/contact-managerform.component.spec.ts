import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactManagerformComponent } from './contact-managerform.component';

describe('ContactManagerformComponent', () => {
  let component: ContactManagerformComponent;
  let fixture: ComponentFixture<ContactManagerformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactManagerformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactManagerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
