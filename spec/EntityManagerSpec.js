describe("EntityManager", function() {
  let manager;
  let player;
  class Position extends Component { }
  class Velocity extends Component { }

  beforeEach(function() {
    manager = new EntityManager();
  });

  function testCreateEntity(moreDescription, components, properties) {
    describe("when a new entity is created" + moreDescription, function() {
      beforeEach(function() {
        player = manager.createEntity(components);
      });

      it("it should return an Entity", function() {
        expect(player instanceof Entity).toBe(true);
      });

      it("the new entity id should be in the entities set", function() {
        expect(manager.entities).toContain(player.id);
      });

      if (components.length > 0) {
        it("it should contain the components as properties", function() {
          for (let i in properties) {
            expect(player[properties[i]]).toBeDefined();
          }
        });
      }
    });
  }

  testCreateEntity("", [], []);
  testCreateEntity(" with some components",
                   [Position, Velocity], ["position", "velocity"]);
});
