
/**
 * A wrapper for an entity id.
 * This object should only be used as a convenience, and not be stored.
 */
class Entity {

  /**
   * Initialize the entity.
   * @constructor
   * @param {uuid} id - a UUID following RFC4122
   * @param {object} manager - an EntityManager instance
   */
  constructor(id, manager) {
    this._id = id;
    this._manager = manager;
    this._componentStore = manager.componentStore;
  }

  /**
   * Returns the entity id.
   * @returns {uuid} - the entity id
   */
  get id() {
    return this._id;
  }

  /**
   * Adds a component to the entity.
   * Makes it accessible via its properties, example:
   *   let player = manager.createEntity();
   *   player.addComponent(new Position());
   *   player.position.x = 10;
   * @param {Component} component - a component object
   */
  addComponent(component) {
    this._componentStore.set(this.id, component);
    Object.defineProperty(this, this._getPropertyName(component), {
      get: function() {
        return this._componentStore.get(this.id, component.constructor.name);
      }
    });
  }

  _getPropertyName(component) {
    let s = component.constructor.name;
    return s.charAt(0).toLowerCase() + s.slice(1);
  }
}
