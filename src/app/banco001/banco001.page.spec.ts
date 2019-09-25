import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Banco001Page } from './banco001.page';

describe('Banco001Page', () => {
  let component: Banco001Page;
  let fixture: ComponentFixture<Banco001Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Banco001Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Banco001Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
