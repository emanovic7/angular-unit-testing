import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { first } from "rxjs/operators";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent, (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Batman', strength: 99 },
      { id: 2, name: 'CatWoman', strength: 85 },
      { id: 3, name: 'Superman', strength: 1000 }
    ]

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deletHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    
  });

  it('should render each hero as a Hero Component', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //runs ngOnInit
    fixture.detectChanges();
    const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponentDes.length).toEqual(3);
    expect(heroComponentDes[0].componentInstance.hero.name).toEqual('Batman');
    expect(heroComponentDes[1].componentInstance.hero.name).toEqual('CatWoman');
    expect(heroComponentDes[2].componentInstance.hero.name).toEqual('Superman');

    for(let i=0; i<heroComponentDes.length; i++) {
      expect(heroComponentDes[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`should call HeroService.deleteHero when the Hero Component's 
      delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        let firstComponent = heroComponents[0];
        firstComponent.query(By.css('button'))
        .triggerEventHandler('click', { stopPropagation: () => {} });

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
      });
});