describe("Entity", function() {
  let manager;
  let player;
  let playerPosition;
  class Position extends Component { }

  beforeEach(function() {
    manager = new EntityManager();
    playerPosition = new Position();
  });

  describe("when a new entity is created", function() {
    it("its id should be a string", function() {
      expect(manager.createEntity().id).toEqual(jasmine.any(String));
    });

    it("its id should be an uuid following rfc4122", function() {
      let pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      expect(manager.createEntity().id).toMatch(pattern);
    });

    it("its id should be an unique id each time", function() {
      let ids = [];
      let n = 1000;
      for (let i = 0; i < n; i++) {
        ids.push(manager.createEntity().id);
      }
      let s = new Set(ids);
      expect(ids.length).toEqual(s.size);
    });
  });

  describe("when a new component is added", function() {
    beforeEach(function() {
      playerPosition = new Position();
      playerPosition.x = 10;
      player = manager.createEntity();
      player.addComponent(playerPosition);
    });

    it("it should be in the store", function() {
      expect(manager.componentStore.has(player.id, "Position")).toBe(true);
    });

    it("it should be accessible as a property of the entity "
     + "(player.position for the Position component)", function() {
      expect(player.position)
        .toEqual(manager.componentStore.get(player.id, "Position"));
    });

    it("modifying it via the entity should modify it in the store", function() {
      player.position.x = 15;
      expect(player.position)
        .toEqual(manager.componentStore.get(player.id, "Position"));
    });
  });
});
