const NAMES = [
  'Ferumbras', "Merlin", "Ernest Galanodel", "Decard Cain", "Thoris Druid of Elemental", "Raishia", "Yennefer of Vengerberg"
]
const CANTRIPS = [
  'Chill Touch', 'Control Flames', 'Fire Bolt', 'Gust', 'Light', 'Minor Illusion', 'Prestidigitation', 
  'Toll the Dead', 'Shocking Grasp', 'Poison Spray'
]
const SPELLS_LVL_1 = [
  'Absorb Elements', 'Burning Hands', 'Cause Fear', 'Charm Person', 'Detect Magic', 'False Life', 
  'Find Familiar', 'Witch Bolt', 'Snare', 'Sleep'
]
const SPELLS_LVL_2 = [
  'Arcane Lock', 'Cloud of Daggers', 'Crown of Madness', 'Darkness', 'Dust Devil', 'Enlarge/Reduce', 
  'Hold Person', 'Invisibility', 'Levitate', 'Web'
]
const SPELLS_LVL_3 = [
  'Vampiric Touch', 'Thunder Step', 'Summon Undead', 'Slow', 'Remove Curse', 'Magic Circle', 
  'Haste', 'Fly', 'Fireball', 'Dispel Magic'
]
const ALL_SPELLS = [CANTRIPS, SPELLS_LVL_1, SPELLS_LVL_2, SPELLS_LVL_3]


class Wizard {
  constructor(name, lvl, spells) {
    this.name = name
    this.lvl = lvl
    this.spells = spells
  }
}


class WizardGenerator {
  generateWizard(lvl) {
    const name = pick(NAMES)
    const spells = this.generateSpells(lvl)
    return new Wizard(name, lvl, spells)
  }

  generateSpellsTableArray(lvl) {
    return [
      4,                       // cantrips
      lvl + 2,                 // lvl 1
      lvl >= 3 ? lvl : 0,      // lvl 2
      lvl >= 5 ? lvl - 2 : 0   // lvl 3
    ]
  }

  // this function returns array of arrays containings all this wizard spells for example [[cantrips], [lvl1], [lvl2], etc.]
  generateSpells(lvl) {
    let spells = []
    const spellsTableArray = this.generateSpellsTableArray(lvl)
    for (let i = 0; i < spellsTableArray.length; i++) {
      spells[i] = pickN(ALL_SPELLS[i], spellsTableArray[i])
    }
    return spells
  }
}


class ViewRenderer {
  constructor() {
    this.wizardLvlSelector = document.getElementById('lvl-select')
    this.generatorButtonRef = document.getElementById('generate-button')
    this.spellsBlockRef = document.getElementById('spells-block')
    this.nameAndLvlBlockRef = document.getElementById('name-and-lvl')
  }

  clearWizard() {
    this.spellsBlockRef.innerHTML = ""
    this.nameAndLvlBlockRef.innerHTML = ""
  }

  createDiv(id) {
    const div = document.createElement('div')
    div.id = id
    div.className = 'single-spell-block'
    return div
  }

  //creates divs for spell lvls only if needed
  createNewDivBlocksForSpells(wizardSpells) {
    for (let i = 0; i < wizardSpells.length; i++) {
      if (wizardSpells[i].length > 0) {
        const newDiv = this.createDiv(`lvl-${i}-spells`)
        this.spellsBlockRef.append(newDiv)
      }
    }
  }

  renderSpellNamesForOneLvl(spellsLvl, spells) {
    const targetBlock = document.getElementById(`lvl-${spellsLvl}-spells`)
    const spellNamesAsString = spells[spellsLvl].join(", ")
    if (spellsLvl) {
      targetBlock.innerHTML = `lvl ${spellsLvl} spells: ${spellNamesAsString}`
    } else {
      targetBlock.innerHTML = `cantrips: ${spellNamesAsString}`
    }
  }

  renderAllWizardSpells(spells) {
    for (let i = 0; i < spells.length; i++) {
      if (spells[i].length) {
        this.renderSpellNamesForOneLvl(i, spells)
      }
    }
  }

  renderNameAndLvl(wizard) {
    const nameAndLvlAsString = `${wizard.name} (lvl ${wizard.lvl})`
    this.nameAndLvlBlockRef.innerHTML = nameAndLvlAsString
  }

  renderWizard(wizard) {
    this.createNewDivBlocksForSpells(wizard.spells)
    this.renderNameAndLvl(wizard)
    this.renderAllWizardSpells(wizard.spells)
  }

}


const viewRenderer = new ViewRenderer()
const wizardGenerator = new WizardGenerator()

 // this function goes to HTML to 'GENERATE' button and basically is a logic of this app
function createWizard() {
  viewRenderer.clearWizard()
  
  const lvl = parseInt(viewRenderer.wizardLvlSelector.value)
  const myWizard = wizardGenerator.generateWizard(lvl)

  viewRenderer.renderWizard(myWizard)
}