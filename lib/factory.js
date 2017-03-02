import _ from 'lodash'

import ObjectGenerator from './object_generator'

class Factory {
  constructor (templates, options = {}) {
    if (options.seed) this.seed = options.seed
    this.templates = templates
  }

  build (name, trait, attributes = {}) {
    if (trait && typeof trait === 'string') {
      return this._buildTrait(name, trait, attributes)
    }

    // trait is optional, so second argument might actually be attributes
    if (trait && typeof trait === 'object') {
      return this._buildBase(name, trait)
    }

    return this._buildBase(name)
  }

  /** @private */
  _buildBase (name, attributes = {}) {
    const generator = new ObjectGenerator(this.seed)

    const baseObject = generator.compile(
      this.templates[name].base,
      this.templates[name].options)

    return _.merge(baseObject, attributes)
  }

  /** @private */
  _buildTrait (name, trait, attributes = {}) {
    const generator = new ObjectGenerator(this.seed)

    const traitObject = generator.compile(
      _.merge(this.templates[name].base, this.templates[name][trait]),
      this.templates[name].options
    )

    return _.merge(traitObject, attributes)
  }
}

export default Factory