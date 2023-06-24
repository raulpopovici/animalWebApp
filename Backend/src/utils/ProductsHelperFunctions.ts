export const convertAnimalTypeToString = (animalType: string[]) => {
  let convertAnimalTypeToString: string[] = [""];
  for (const animal of animalType) {
    switch (animal) {
      case "1": {
        convertAnimalTypeToString.push("cat");
        break;
      }
      case "2": {
        convertAnimalTypeToString.push("dog");
        break;
      }
      case "3": {
        convertAnimalTypeToString.push("bird");
        break;
      }
      case "4": {
        convertAnimalTypeToString.push("rodent");
        break;
      }
      case "5": {
        convertAnimalTypeToString.push("fish");
        break;
      }
    }
  }
  return convertAnimalTypeToString;
};

export const getPriceRange = (price: string) => {
  switch (price) {
    case "1": {
      const priceRange = {
        minPrice: 0,
        maxPrice: 5,
      };
      return priceRange;
    }
    case "2": {
      const priceRange = {
        minPrice: 5,
        maxPrice: 10,
      };
      return priceRange;
    }
    case "3": {
      const priceRange = {
        minPrice: 10,
        maxPrice: 50,
      };
      return priceRange;
    }
    case "4": {
      const priceRange = {
        minPrice: 50,
        maxPrice: 100,
      };
      return priceRange;
    }
    case "5": {
      const priceRange = {
        minPrice: 100,
        maxPrice: 0,
      };
      return priceRange;
    }
    default: {
      const priceRange = {
        minPrice: 0,
        maxPrice: 0,
      };
      return priceRange;
    }
  }
};

export const convertBrandToString = (brands: string[]) => {
  let convertBrandToString: string[] = [""];
  for (const brand of brands) {
    switch (brand) {
      case "1": {
        convertBrandToString.push("Chappi");
        break;
      }
      case "2": {
        convertBrandToString.push("Royal Canin");
        break;
      }
      case "3": {
        convertBrandToString.push("Whiskas");
        break;
      }
      case "4": {
        convertBrandToString.push("Tropical Pond");
        break;
      }
      case "5": {
        convertBrandToString.push("Pedigree");
        break;
      }
    }
  }
  return convertBrandToString;
};

export const convertAgeToString = (ages: string[]) => {
  let convertAgeToString: string[] = [""];
  for (const age of ages) {
    switch (age) {
      case "1": {
        convertAgeToString.push("junior");
        break;
      }
      case "2": {
        convertAgeToString.push("adult");
        break;
      }
      case "3": {
        convertAgeToString.push("senior");
        break;
      }
    }
  }
  return convertAgeToString;
};

export const convertTasteToString = (tastes: string[]) => {
  let convertTasteToString: string[] = [""];
  for (const taste of tastes) {
    switch (taste) {
      case "1": {
        convertTasteToString.push("beef");
        break;
      }
      case "2": {
        convertTasteToString.push("chicken");
        break;
      }
      case "3": {
        convertTasteToString.push("pork");
        break;
      }
    }
  }
  return convertTasteToString;
};
