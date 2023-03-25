export const craftingMaterials = {
  magicOrb: {
    name: 'Magic Orb',
    description: 'Reroll an item to have one random mod, making it a Magic rarity item.'
  },
  rareOrb: {
    name: 'Rare Orb',
    description: 'Reroll an item to have two mods, making it a Rare rarity item.'
  }
};

export const itemDescriptionsBySubtype = {
  Sword: 'A sharp sword. Attacks with this weapon are Melee type, and always seek out the nearest enemy.',
  Bow: 'A bow, in working condition. Attacks with this weapon are Ranged type, dealing more damage, but always targeting a random enemy.',
  Staff: 'A magical staff. Attacks with this weapon are Magic type, always targeting a random enemy, and dealing armor-piercing damage.',
  Plated: 'Plated armor is the thickest type of armor. Grants a bonus to Armor.',
  Chain: 'Chain armor allows the wearer to stay mobile while also granting protection. Grants a bonus to Evasion.',
  Banded: 'Banded armor is made of tough leather. granting decent protection against smaller arms. Grants a bonus to HP.',
  Leather: 'Leather armor doesn\'t offer much protection, but allows the wearer great freedom of movement. Grants a small bonus to damage.'
};
