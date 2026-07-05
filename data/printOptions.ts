export type PrintOptionKey = "flexographic-print-10-colors";

export type PrintCapability = {
  title: string;
  description: string;
};

export type PrintQualityItem = {
  label: string;
  description: string;
};

export type PrintColor = {
  code: string;
  name: string;
  hex: string;
};

export type PrintOptionDetails = {
  key: PrintOptionKey;
  title: string;
  summary: string;
  introduction: string;
  capabilities: PrintCapability[];
  quality: PrintQualityItem[];
  materials: string[];
  productionCycle?: string;
  paletteTitle: string;
  paletteDescription: string;
  paletteNote: string;
  colors: PrintColor[];
  conclusion: string;
};

export const printOptions: Record<PrintOptionKey, PrintOptionDetails> = {
  "flexographic-print-10-colors": {
    key: "flexographic-print-10-colors",
    title: "10-кольоровий флексографічний друк",
    summary:
      "Яскраве та стабільне відтворення дизайну упаковки з використанням CMYK і додаткових кольорів Pantone",
    introduction:
      "10-кольоровий флексографічний друк дає змогу отримувати точні, насичені та стабільні відбитки на рулонних пакувальних матеріалах. Технологія підходить для відтворення складних макетів і корпоративних кольорів у серійному виробництві харчової упаковки.",
    capabilities: [
      {
        title: "Розширена палітра",
        description:
          "До 10 фарб одночасно, включно зі стандартними CMYK і додатковими кольорами Pantone",
      },
      {
        title: "Гнучкість матеріалів",
        description:
          "Друк на рулонних матеріалах, зокрема поліетилені та ламінованих плівках",
      },
      {
        title: "Повний цикл",
        description:
          "Додаткові технології ламінації, порізки та контроль якості на кожному етапі",
      },
      {
        title: "Стабільний результат",
        description:
          "Відтворювана якість від тиражу до тиражу та погоджений виробничий цикл",
      },
    ],
    quality: [
      {
        label: "Точність кольоровідтворення",

        description:
          "Контроль відповідності затвердженому дизайн-макету під час підготовки та друку",
      },
      {
        label: "Стабільність відтінку",

        description:
          "Контроль макета, додрукарської підготовки, друку та готового накладу",
      },
      {
        label: "Плашкові кольори",

        description:
          "Точне відтворення насичених корпоративних відтінків без втрати яскравості",
      },
    ],
    materials: ["Поліетилен", "Ламіновані плівки", "Рулонні матеріали"],
    paletteTitle: "Доступна палітра матеріалу",
    paletteDescription:
      "Базові відтінки пігментованого матеріалу можна поєднувати з індивідуальним друком відповідно до технічного завдання.",
    paletteNote:
      "Відтінки на екрані є орієнтовними. Фінальний колір погоджується за фізичним зразком.",
    colors: [
      { code: "WE", name: "Білий", hex: "#F7F7F3" },
      { code: "IY", name: "Кремовий", hex: "#F6DFA0" },
      { code: "BE", name: "Бежевий", hex: "#EFD8C7" },
      { code: "BE18", name: "Бежевий 18", hex: "#E8B992" },
      { code: "YW4", name: "Жовтий YW4", hex: "#F1E400" },
      { code: "YW5", name: "Жовтий YW5", hex: "#F5EE5D" },
      { code: "YW6", name: "Жовтий YW6", hex: "#EFCB62" },
      { code: "YW8", name: "Жовтий YW8", hex: "#F5EC55" },
      { code: "YW-OE", name: "Жовто-помаранчевий", hex: "#F4B700" },
      {
        code: "YW-OE814",
        name: "Жовто-помаранчевий 814",
        hex: "#EB8500",
      },
      { code: "RD", name: "Червоний", hex: "#DE0808" },
      { code: "BX", name: "Бордовий", hex: "#B50010" },
      { code: "GN", name: "Зелений", hex: "#08A94F" },
      { code: "GN1", name: "Темно-зелений", hex: "#527B36" },
      { code: "BLU", name: "Синій", hex: "#0E70B4" },
      { code: "BLU4020", name: "Синій 4020", hex: "#527FE0" },
      { code: "BLK", name: "Чорний", hex: "#090909" },
      { code: "BN", name: "Бронзовий", hex: "#C29200" },
      { code: "BN469C", name: "Бронзовий BN469C", hex: "#8B6900" },
    ],
    conclusion:
      "10-кольоровий флексодрук підходить для яскравої багатокольорової упаковки, де важливі точне відтворення фірмових кольорів, стабільність тиражу та гнучкість матеріалів",
  },
};

export function getPrintOptionDetails(key: PrintOptionKey) {
  return printOptions[key];
}
