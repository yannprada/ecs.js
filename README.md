# ecs.js
[WIP] Entity Component System in javascript

[Run tests](https://yannprada.github.io/ecs.js/SpecRunner.html)

## Notes

### Entity

- if the entity can have logic related to ECS, creating, destroying components,
etc, then no need for an EntityManager
- but then which object will construct the entity back ?
- can the entity build itself, given a list of component instances ?

### ComponentStore

- this can be a singleton -> static class, no instances
- this way, it can be retrieved anywhere
- maybe it can be responsible of rebuilding entities when needed, passing
components instances to the entity class, so that it can rebuild itself ?
