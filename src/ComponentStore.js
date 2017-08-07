
/**
 * A two-dimensional Map that stores components by Type, then Entity id.
 */
class ComponentStore {

  /**
   * @constructor
   */
  constructor() {
    this._components = new Map();
  }

  /**
   * Adds a component to the store.
   * @param {uuid} id - the entity id
   * @param {Object} component - the component
   */
  set(id, component) {

    let componentType = component.constructor.name;
    if (! (this._components.has(componentType))) {
      this._components.set(componentType, new Map());
    }
    this._components
      .get(componentType)
      .set(id, Object.assign(Object.create(component), component));
  }

  /**
   * Gets a component from the store.
   * @param {uuid} id - the entity id
   * @param {string} componentType - the name of the component type
   * @returns {Object} - the component
   */
  get(id, componentType) {

    let component = this._get(id, componentType);
    if (component == undefined) {
      throw new LookupError(`component ${componentType} not found for entity with ID = ${id}`);
    } else {
      return component;
    }
  }

  /**
   * Removes a component from the store.
   * @param {uuid} id - the entity id
   * @param {string} componentType - the name of the component type
   */
  del(id, componentType) {

    if (this.has(id, componentType)) {
      this._components.get(componentType).delete(id);
    }
  }

  /**
   * Check if a component exists in the store.
   * @param {uuid} id - the entity id
   * @param {string} componentType - the name of the component type
   * @returns {boolean} - true if the component exists, else false
   */
  has(id, componentType) {

    if (this._get(id, componentType) == undefined) {
      return false;
    } else {
      return true;
    }
  }

  _get(id, componentType) {
    if (this._components.has(componentType)) {
      let components = this._components.get(componentType);
      if (components.has(id)) {
        return components.get(id);
      }
    }
  }
}
