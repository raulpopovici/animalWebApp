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
import styles from "../AdminProducts.module.css";
import {
  AddProductModalState,
  AddProductModalStateType,
  addProductModalReducer,
  initialAddProductModalData,
} from "../AdminProductsReducer";
import axios from "axios";
import { Radio, RadioGroup, Textarea } from "@mui/joy";

export const AddProductModal = ({
  open,
  handleCloseModal,
  dispatchAddProductModalReducer,
  handleSaveProduct,
}: {
  open: boolean;
  handleCloseModal: () => void;
  dispatchAddProductModalReducer: React.Dispatch<AddProductModalStateType>;
  handleSaveProduct: () => void;
}) => {
  const [scroll, setScroll] = React.useState<boolean>(true);

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
            Add Product
          </Typography>
          <div>
            <div className={styles.inputTextStyle}>Name</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.name,
                  payload: event.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Price</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.price,
                  payload: parseFloat(event.target.value),
                })
              }
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Brand</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.brand,
                  payload: event.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Animal Age</div>
            <select
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.animalAge,
                  payload: event.target.value,
                })
              }
            >
              <option value="Junior" className={styles.selectItems}>
                Junior
              </option>
              <option value="Adult" className={styles.selectItems}>
                Adult
              </option>
              <option value="Senor" className={styles.selectItems}>
                Senior
              </option>
            </select>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Animal type</div>
            <select
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.animalType,
                  payload: event.target.value,
                })
              }
            >
              <option value="Cat" className={styles.selectItems}>
                Cat
              </option>
              <option value="Dog" className={styles.selectItems}>
                Dog
              </option>
              <option value="Bird" className={styles.selectItems}>
                Bird
              </option>
              <option value="Rodent" className={styles.selectItems}>
                Rodent
              </option>
              <option value="Fish" className={styles.selectItems}>
                Fish
              </option>
            </select>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Weight</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.productWeight,
                  payload: parseFloat(event.target.value),
                })
              }
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Description</div>
            <textarea
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.description,
                  payload: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Composition</div>
            <textarea
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.composition,
                  payload: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Nutritional Additives</div>
            <textarea
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.nutritionalAdditives,
                  payload: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Analytical Constituents</div>
            <textarea
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.analyticalConstituents,
                  payload: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Taste</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.taste,
                  payload: event.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Image</div>
            <input
              className={styles.inputStyle}
              onChange={(event) =>
                dispatchAddProductModalReducer({
                  type: AddProductModalState.image,
                  payload: event.target.value,
                })
              }
            ></input>
          </div>

          <button
            className={styles.saveProductButton}
            onClick={() => handleSaveProduct()}
          >
            Save Product
          </button>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};
