export const TREATS = [
  {
    id: "brownie",
    name: "Chocolate Brownie",
    price: 3.5,
    description: "Dense cocoa square with a crackly top — best with coffee.",
  },
  {
    id: "cookie",
    name: "Lemon Cookie",
    price: 2.0,
    description: "Buttery shortbread kissed with citrus zest.",
  },
  {
    id: "muffin",
    name: "Berry Muffin",
    price: 4.25,
    description: "Tall muffin studded with seasonal berries.",
  },
];

export function getTreatById(treatId) {
  return TREATS.find((treat) => treat.id === treatId);
}
