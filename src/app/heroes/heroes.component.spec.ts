import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Batman', strength: 99},
      {id: 2, name: 'Iron man', strength: 95},
      {id: 1, name: 'Samwise Gamgee', strength: 5000}
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes', 'addHero', 'deleteHero'
    ]);

    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {

    it('should remove indicated hero from list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      //arrange
      component.heroes = HEROES;
      let heroToDelete = HEROES[1];
      //act
      component.delete(heroToDelete);
      //assert
      expect(component.heroes.length).not.toContain(heroToDelete);
    });

    it('should call deleteHero with correct parameter', () => {
      //arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      let heroToDelete = HEROES[2];
      //act
      component.delete(heroToDelete);
      //assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroToDelete);
    });
  })

});