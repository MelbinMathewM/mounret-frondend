import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueSection } from './catalogue-section';

describe('CatalogueSection', () => {
  let component: CatalogueSection;
  let fixture: ComponentFixture<CatalogueSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueSection],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
