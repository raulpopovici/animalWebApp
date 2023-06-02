import Option from "@mui/joy/Option";
import { Select } from "@mui/joy";
import { Animal } from "../../../Interfaces/AnimalPageInterface";

export const SelectPetForMate = ({
  animals,
  findMatches,
  disabled,
}: {
  animals: Animal[];
  findMatches: (animalId: string) => void;
  disabled?: boolean;
}) => {
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    findMatches(newValue!);
  };
  return (
    <Select
      placeholder="Select a pet…"
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.05) 2px 10px 20px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
      }}
      onChange={handleChange}
      disabled={disabled}
    >
      {animals.map((animal: Animal) => {
        return (
          <Option value={animal.id} key={animal.id}>
            {animal.name}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectPetForMate;
