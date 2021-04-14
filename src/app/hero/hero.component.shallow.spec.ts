import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe('heroComponent, (shallowTests)', () => {

  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have correct hero', () => {
    fixture.componentInstance.hero = {id: 1, name: 'Batman', strength: 99}

    expect(fixture.componentInstance.hero.name).toEqual('Batman');
  });

  it('should have the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = {id: 1, name: 'Batman', strength: 99}
    fixture.detectChanges();

    let debugAnchorTag = fixture.debugElement.query(By.css('a'));
    expect(debugAnchorTag.nativeElement.textContent).toContain('Batman');
    //expect(fixture.nativeElement.querySelector('a').textContent).toContain('Batman');
  });
});