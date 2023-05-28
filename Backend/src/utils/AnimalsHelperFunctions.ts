export const convertSexToString = (type: number) => {
  switch (type) {
    case 0: {
      return "male";
      break;
    }
    case 1: {
      return "female";
      break;
    }
  }
};

export const convertAnimalTypeToString = (type: number) => {
  switch (type) {
    case 0: {
      return "cat";
      break;
    }
    case 1: {
      return "dog";
      break;
    }
    case 2: {
      return "bird";
      break;
    }
    case 3: {
      return "rodent";
      break;
    }
    case 4: {
      return "fish";
      break;
    }
  }
};
