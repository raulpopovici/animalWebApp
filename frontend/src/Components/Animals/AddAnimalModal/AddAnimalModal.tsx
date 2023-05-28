import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Switch from "@mui/joy/Switch";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import ModalOverflow from "@mui/joy/ModalOverflow";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import styles from "../Animals.module.css";
import {
  AddAnimalModalState,
  AddAnimalModalStateType,
  addAnimalModalReducer,
  initialAddAnimalModalData,
} from "../AnimalsReducer";
import axios from "axios";
import { Radio, RadioGroup, Textarea } from "@mui/joy";

export const AddAnimalModal = ({
  open,
  handleCloseModal,
  dispatchAddAnimalModalReducer,
  handleSaveAnimal,
}: {
  open: boolean;
  handleCloseModal: () => void;
  dispatchAddAnimalModalReducer: React.Dispatch<AddAnimalModalStateType>;
  handleSaveAnimal: () => void;
}) => {
  const [scroll, setScroll] = React.useState<boolean>(true);

  const [radioValue, setRadioValue] = React.useState<string>("0");

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "0") {
      dispatchAddAnimalModalReducer({
        type: AddAnimalModalState.forAdoption,
        payload: true,
      });
    } else {
      dispatchAddAnimalModalReducer({
        type: AddAnimalModalState.forAdoption,
        payload: false,
      });
    }

    setRadioValue(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleCloseModal();
      }}
    >
      <ModalOverflow>
        <ModalDialog
          aria-labelledby="modal-dialog-overflow"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Add animal
          </Typography>
          <div>
            <div className={styles.inputTextStyle}>Name</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddAnimalModalReducer({
                  type: AddAnimalModalState.name,
                  payload: event.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Animal type</div>
            <select
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddAnimalModalReducer({
                  type: AddAnimalModalState.animalType,
                  payload: Number(event.target.value),
                })
              }
            >
              <option value="0" className={styles.selectItems}>
                Cat
              </option>
              <option value="1" className={styles.selectItems}>
                Dog
              </option>
              <option value="2" className={styles.selectItems}>
                Bird
              </option>
              <option value="3" className={styles.selectItems}>
                Rodent
              </option>
              <option value="4" className={styles.selectItems}>
                Fish
              </option>
            </select>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Breed</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddAnimalModalReducer({
                  type: AddAnimalModalState.breed,
                  payload: event.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Age</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddAnimalModalReducer({
                  type: AddAnimalModalState.age,
                  payload: Number(event.target.value),
                })
              }
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Sex</div>
            <select
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddAnimalModalReducer({
                  type: AddAnimalModalState.sex,
                  payload: Number(event.target.value),
                })
              }
            >
              <option value="0" className={styles.selectItems}>
                Male
              </option>
              <option value="1" className={styles.selectItems}>
                Female
              </option>
            </select>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Weight</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddAnimalModalReducer({
                  type: AddAnimalModalState.weight,
                  payload: parseFloat(event.target.value),
                })
              }
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Details</div>
            <textarea
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddAnimalModalReducer({
                  type: AddAnimalModalState.details,
                  payload: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Image 1</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddAnimalModalReducer({
                  type: AddAnimalModalState.image1,
                  payload: event.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Image 2</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddAnimalModalReducer({
                  type: AddAnimalModalState.image2,
                  payload: event.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Image 3</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddAnimalModalReducer({
                  type: AddAnimalModalState.image3,
                  payload: event.target.value,
                })
              }
            ></input>
          </div>
          <FormControl>
            <RadioGroup
              value={radioValue}
              defaultValue="outlined"
              name="radio-buttons-group"
              onChange={(event) => {
                handleChangeRadio(event);
              }}
            >
              <Radio
                value="0"
                label="Adoption"
                variant="outlined"
                sx={{
                  color: "hsla(0, 0%, 10%, 0.7)",
                  fonrFamily: "Open Sans, sans-serif",
                }}
              />
              <Radio
                value="1"
                label="Find mate"
                variant="outlined"
                sx={{
                  color: "hsla(0, 0%, 10%, 0.7)",
                  fonrFamily: "Open Sans, sans-serif",
                }}
              />
            </RadioGroup>
          </FormControl>
          <button
            className={styles.saveAnimalButton}
            onClick={() => handleSaveAnimal()}
          >
            Save animal
          </button>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};
