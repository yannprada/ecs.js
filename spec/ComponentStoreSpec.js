describe("ComponentStore", function() {
  let store;
  let playerID;
  let playerPosition;
  let otherID;
  let otherPosition;

  class Position extends Component { }

  beforeEach(function() {
    store = new ComponentStore();
    playerID = 0;
    otherID = 1;
  });

  describe("when a Position component is set", function() {
    beforeEach(function() {
      playerPosition = new Position();
      playerPosition.x = 10;
      store.set(playerID, playerPosition);
    });

    it("it should be in the store", function() {
      expect(store.has(playerID, "Position")).toBe(true);
    });

    it("it should be equal to the one in the store", function() {
      expect(store.get(playerID, "Position")).toEqual(playerPosition);
    });
  });

  describe("when a Position component is set twice with different data",
      function() {
    beforeEach(function() {
      playerPosition = new Position();
      playerPosition.x = 10;
      store.set(playerID, playerPosition);

      otherPosition = new Position();
      otherPosition.x = 15;
      store.set(playerID, otherPosition);
    });

    it("a Position component should be in the store", function() {
      expect(store.has(playerID, "Position")).toBe(true);
    });

    it("it should be different from the first component", function() {
      expect(store.get(playerID, "Position")).not.toEqual(playerPosition);
    });

    it("it should be equal to the latest component set", function() {
      expect(store.get(playerID, "Position")).toEqual(otherPosition);
    });
  });

  describe("when a Position component, with the same data, "
         + "is set for two different entity ids", function() {
    beforeEach(function() {
      playerPosition = new Position();
      playerPosition.x = 10;
      store.set(playerID, playerPosition);
      store.set(otherID, playerPosition);
    });

    it("two Position components should be in the store, one for each entity id",
        function() {
      expect(store.has(playerID, "Position")).toBe(true);
      expect(store.has(otherID, "Position")).toBe(true);
    });

    it("the two components should be equal", function() {
      expect(store.get(playerID, "Position"))
        .toEqual(store.get(otherID, "Position"));
    });

    it("modifying the properties of one"
     + "should not modify the properties of the other", function() {
      store.get(playerID, "Position").x = 15;
        expect(store.get(playerID, "Position"))
          .not.toEqual(store.get(otherID, "Position"));
    });
  });

  describe("when we try to get a component that is not in the store", function() {
    it("an error should be raised", function() {
      let getpos = function() {
        store.get(playerID, "Position");
      }
      expect(getpos).toThrowError(LookupError);
    });
  });

  describe("when a Position component is set then deleted", function() {
    beforeEach(function() {
      playerPosition = new Position();
      store.set(playerID, playerPosition);
      store.del(playerID, "Position");
    });

    it("the component should not be in the store", function() {
      expect(store.has(playerID, "Position")).toBe(false);
    });
  });
});
