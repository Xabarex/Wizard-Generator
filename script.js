const NAMES = ['Ferumbras', "Merlin", "Ernest", "Decard Cain"]

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
    return div
  }

  //creates divs for spell lvls only if needed
  createNewDivBlocksForSpells(spellsTableArray) {
    for (let i = 0; i < spellsTableArray.length; i++) {
      if (spellsTableArray[i]) {
        const newDiv = this.createDiv(`lvl-${i}-spells`)
        this.spellsBlockRef.append(newDiv)
        console.log(`just created lvl-${i}-spells div block`) // development purpose
      }
    }
  }

  renderSpellNamesForOneLvl(spellsLvl, spells) {
    const targetBlock = document.getElementById(`lvl-${spellsLvl}-spells`)
    const spellNamesAsString = spells[spellsLvl].join(", ")
    targetBlock.innerHTML = spellNamesAsString
  }

  renderAllWizardSpells(spells) {
    for (let i = 0; i < spells.length; i++) {
      if (spells[i].length) {
        this.renderSpellNamesForOneLvl(i, spells)
      }
    }
  }

  renderWizard(wizard) {
    // 1. wyprintuj imie i lvl wizarda np. "Ferumbras (lvl 3)"
    const nameAndLvlAsString = `${wizard.name} (lvl ${wizard.lvl})`
    this.nameAndLvlBlockRef.innerHTML = nameAndLvlAsString

    // 2. osobny div dla każdego lvla spelli
  }
}


const viewRenderer = new ViewRenderer()
const wizardGenerator = new WizardGenerator()

 // this function goes to HTML to 'GENERATE' button and basically is a logic of this app
function createWizard() {
  viewRenderer.clearWizard()
  
  // 1. weź lvl z selecta
  const lvl = parseInt(viewRenderer.wizardLvlSelector.value)

  // 2. używając wizardGeneratora stwórz wizarda
  const myWizard = wizardGenerator.generateWizard(lvl)
  console.log(myWizard) // development purposes

  // 3. używając viewRenderera wyprintuj wizarda
  viewRenderer.createNewDivBlocksForSpells(wizardGenerator.generateSpellsTableArray(lvl))
  viewRenderer.renderWizard(myWizard)
  viewRenderer.renderAllWizardSpells(myWizard.spells)
}