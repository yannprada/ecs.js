
/**
 * Manage entities.
 */
class EntityManager {

  /**
   * Initialize the manager.
   * @constructor
   */
  constructor() {
    this.componentStore = new ComponentStore();
    this._rfc4122 = new RFC4122();
    this._entities = new Set();
  }

  /**
   * Creates and returns a new entity id.
   * @param {Component[]} [components] - a list of components (types, not instances)
   * @returns {uuid} - the new entity id
   */
  createEntity(components = []) {
    let id = this._createID();
    this._entities.add(id);
    let entity = new Entity(id, this);
    for (let i in components) {
      entity.addComponent(new components[i]());
    }
    return entity;
  }

  /**
   * Returns the set of all entities.
   * @returns {Set} - the entities
   */
  get entities() {
    return this._entities;
  }

  _createID() {
    return this._rfc4122.v4();
  }
}


// type TypeComponentList = Map<IComponent, Map<number, IComponent>>;

// class EntityManager {
//   _nextID : number = 0;
//   _components : TypeComponentList = new Map();

//   /** Create an id representing the new entity, increment it. */
//   Create() : number {
//     let id : number = EntityManager._nextID;
//     EntityManager._nextID++;
//     return id;
//   }

//   /** Destroy the entity in the components list. */
//   Destroy(id : number) : void {
//     for (let componentType in EntityManager._components) {
//       if (id in EntityManager._components[componentType]) {
//         delete EntityManager._components[componentType][id];
//       }
//     }
//   }

//   /** Create the component,
//     populate the components list at the specified id, return the component. */
//   CreateComponent<TComponent>(id : number, componentType : { new(): TComponent ; })
//       : TComponent {
//     let component : TComponent = new componentType();
//     if (EntityManager._components.get(componentType) == undefined) {
//       EntityManager._components.set(componentType, new Map());
//     }
//     EntityManager._components.get(componentType).set(id, component);
//     return component;
//   }

//   /** Remove the component from the list at the specified id. */
//   RemoveComponent<TComponent>(id : number, componentType : { new(): TComponent ; })
//       : void {
//     if (EntityManager._components.get(componentType) != undefined) {
//       if (EntityManager._components.get(componentType).get(id) != undefined) {
//         EntityManager._components.get(componentType).delete(id);
//       } else {
//         throw ReferenceError(`component ${componentType} for entity ${id} not found in components list`);
//       }
//     } else {
//       throw ReferenceError(`component ${componentType} not found in components list`);
//     }
//   }

//   /** Return the component from the list at the specified id. */
//   GetComponent<TComponent>(id : number, componentType : { new(): TComponent ; })
//       : IComponent {
//     if (EntityManager._components.get(componentType) != undefined) {
//       if (EntityManager._components.get(componentType).get(id) != undefined) {
//         return EntityManager._components.get(componentType).get(id);
//       } else {
//         throw ReferenceError(`component ${componentType} for entity ${id} not found in components list`);
//       }
//     } else {
//       throw ReferenceError(`component ${componentType} not found in components list`);
//     }
//   }
// }
