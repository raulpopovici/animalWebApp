export interface Animal {
  id: string;
  name: string;
  breed: string;
  age: number;
  animalType: string;
  sex: string;
  weight: number;
  details: string;
  image1: string;
  image2: string;
  image3: string;
  forAdoption: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
  };
}

export interface IAnimal {
  animals: Animal[];
  animalCount: number;
}
