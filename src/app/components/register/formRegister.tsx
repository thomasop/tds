import React, { useState } from "react";
import styles from "./formRegister.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import validator from "validator";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const FormRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputPseudo, setInputPseudo] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [firstnameInput, setFirstnameInput] = useState<string>("");
  const [lastnameInput, setLastnameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordComfirmInput, setPasswordComfirmInput] = useState<string>("");
  const [majorInput, setMajorInput] = useState<string>("");
  const [validEmailInput, setValidEmailInput] = useState<boolean>(false);
  const [validFirstnameInput, setValidFirstnameInput] =
    useState<boolean>(false);
  const [validLastnameInput, setValidLastnameInput] = useState<boolean>(false);
  const [validPasswordInput, setValidPasswordInput] = useState<boolean>(false);
  const [validPasswordComfirmInput, setValidPasswordComfirmInput] =
    useState<boolean>(false);
  const [validMajorInput, setValidMajorInput] = useState<boolean>(false);
  const [firstnameInputError, setFirstnameInputError] = useState<string>("");
  const [lastnameInputError, setLastnameInputError] = useState<string>("");
  const [passwordInputError, setPasswordInputError] = useState<string>("");
  const [passwordComfirmInputError, setPasswordComfirmError] =
    useState<string>("");
  const [emailInputError, setEmailInputError] = useState<string>("");
  const [majorInputError, setMajorInputError] = useState<string>("");
  const { displayModalRegister } = useSelector(
    (state: RootState) => state.ModalRegister
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      validEmailInput === true &&
      validFirstnameInput === true &&
      validLastnameInput === true &&
      validPasswordInput === true &&
      validPasswordComfirmInput === true &&
      validMajorInput === true
    ) {
      if (inputPseudo.length === 0) {
        const fetchRegister = async () => {
          let response = await fetch("/api/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: validator.escape(emailInput.trim()),
              password: validator.escape(passwordInput.trim()),
              firstname: validator.escape(firstnameInput.trim()),
              lastname: validator.escape(lastnameInput.trim()),
              pseudo: validator.escape(inputPseudo.trim()),
            }),
          });
          let json = await response.json();
          if (json.status === 200) {
            dispatch({
              type: "flash/storeFlashMessage",
              payload: { flashMessage: json.message, type: "success" },
            });
            clearState();
            dispatch({ type: "ModalRegister/close" });
          } else if (json.status === 400) {
            json.message.forEach((element: string) => {
              if (element[0] === "email") {
                setEmailInputError(element[1]);
              }
              if (element[0] === "password") {
                setPasswordInputError(element[1]);
              }
              if (element[0] === "firstname") {
                setFirstnameInputError(element[1]);
              }
              if (element[0] === "lastname") {
                setLastnameInputError(element[1]);
              }
            });
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          } else {
            dispatch({
              type: "flash/storeFlashMessage",
              payload: { flashMessage: json.message, type: "error" },
            });
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          }
        };
        fetchRegister();
      }
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      if (validEmailInput === false) {
        setEmailInputError("Email : doit avoir un format valide");
      }
      if (validFirstnameInput === false) {
        setFirstnameInputError("Prénom : 3 lettres minimum");
      }
      if (validLastnameInput === false) {
        setLastnameInputError("Nom de famille : 3 lettres minimum");
      }
      if (validPasswordInput === false) {
        setPasswordInputError(
          "Mot de passe : doit avoir une lettre en minuscule, un nombre et 8 caractères minimum"
        );
      }
      if (validPasswordComfirmInput === false) {
        setPasswordComfirmError(
          "Comfirmation mot de passe : doit être identique au mot de passe"
        );
      }
      if (validMajorInput === false) {
        setMajorInputError("Vous devez être majeur pour vous inscrire");
      }
    }
  };

  const handlerInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    regex: RegExp,
    setValidInput: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    errorMessage: string
  ) => {
    let removeSpace = "";
    if (e.target.value.charAt(0) === " ") {
      removeSpace = e.target.value.replace(/\s/, "");
      setInput(removeSpace);
    } else {
      removeSpace = e.target.value.replace(/\s\s+/g, " ");
      setInput(removeSpace);
    }

    if (regex.test(removeSpace)) {
      setValidInput(true);
      setErrorMessage("");
    } else if (removeSpace.length === 0) {
      setValidInput(false);
      setErrorMessage("");
    } else {
      setValidInput(false);
      setErrorMessage(errorMessage);
    }
  };
  const handlerInputPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    regex: RegExp,
    setValidInput: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    errorMessage: string
  ) => {
    let removeSpace = "";
    if (e.target.value.charAt(0) === " ") {
      removeSpace = e.target.value.replace(/\s/, "");
      setInput(removeSpace);
    } else {
      removeSpace = e.target.value.replace(/\s+/g, "");
      setInput(removeSpace);
    }
    setInput(removeSpace);
    if (regex.test(removeSpace)) {
      if (
        passwordComfirmInput.length > 0 &&
        removeSpace !== passwordComfirmInput
      ) {
        setValidInput(true);
        setErrorMessage("");
        setPasswordComfirmError(
          "Comfirmation mot de passe : les mots de passe doivent être identique"
        );
        setValidPasswordComfirmInput(false);
      } else {
        setValidInput(true);
        setErrorMessage("");
        setPasswordComfirmError("");
        setValidPasswordComfirmInput(true);
      }
    } else if (removeSpace.length === 0) {
      if (
        passwordComfirmInput.length > 0 &&
        removeSpace !== passwordComfirmInput
      ) {
        setValidInput(false);
        setErrorMessage("");
        setPasswordComfirmError(
          "Comfirmation mot de passe : les mots de passe doivent être identique"
        );
        setValidPasswordComfirmInput(false);
      } else {
        setValidInput(false);
        setErrorMessage("");
        setPasswordComfirmError("");
        setValidPasswordComfirmInput(true);
      }
    } else {
      if (
        passwordComfirmInput.length > 0 &&
        removeSpace !== passwordComfirmInput
      ) {
        setValidInput(false);
        setErrorMessage(errorMessage);
        setPasswordComfirmError(
          "Comfirmation mot de passe : les mots de passe doivent être identique"
        );
        setValidPasswordComfirmInput(false);
      } else {
        setValidInput(false);
        setErrorMessage(errorMessage);
        setPasswordComfirmError("");
        setValidPasswordComfirmInput(true);
      }
    }
  };

  const clearState = () => {
    setValidEmailInput(false);
    setValidFirstnameInput(false);
    setValidLastnameInput(false);
    setValidPasswordInput(false);
    setValidPasswordComfirmInput(false);
    setValidMajorInput(false);
    setEmailInput("");
    setFirstnameInput("");
    setLastnameInput("");
    setPasswordInput("");
    setPasswordComfirmInput("");
    setMajorInput("");
    setEmailInputError("");
    setFirstnameInputError("");
    setLastnameInputError("");
    setIsLoading(false);
    setPasswordInputError("");
    setPasswordComfirmError("");
    setMajorInputError("");
    setInputPseudo("");
  };
  const backLogin = () => {
    clearState();
    dispatch({ type: "ModalRegister/close" });
    dispatch({ type: "ModalLogin/open" });
  };
  const closeForm = () => {
    clearState();
    dispatch({ type: "ModalRegister/close" });
  };
  return (
    <>
      <AnimatePresence>
        {displayModalRegister && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0 }}
              className={styles.bg}
            />
            <motion.div
              initial={{ y: 200, x: "-50%", opacity: 0 }}
              animate={{
                y: "-50%",
                x: "-50%",
                opacity: 1,
                transition: { duration: 0.3 },
              }}
              exit={{
                y: 200,
                x: "-50%",
                opacity: 0,
                transition: { duration: 0.3 },
              }}
              className={styles.register}
            >
              <div className={styles.register__top}>
                <button
                  className={styles.register__top__back}
                  onClick={() => {
                    backLogin();
                  }}
                >
                  Retour à la connection
                </button>
                <button
                  className={styles.register__top__close}
                  onClick={() => closeForm()}
                >
                  <Image
                    className={styles.register__top__close__img}
                    src="/assets/icone/xmark-solid.svg"
                    alt="arrow-left"
                    width={30}
                    height={30}
                  ></Image>
                </button>
              </div>

              <h1 className={styles.register__h1}>Création de compte</h1>
              <form
                className={styles.register__form}
                action=""
                onSubmit={(e) => {
                  if (isLoading === false) {
                    handlerSubmit(e);
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                <TextField
                  autoFocus
                  value={firstnameInput}
                  style={{ margin: "10px 0px" }}
                  id={"firstname"}
                  label={"Prénom"}
                  variant="standard"
                  type={"text"}
                  placeholder={"Entrez votre prénom"}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  onChange={(e) => {
                    handlerInput(
                      e,
                      /^[A-Za-z][A-Za-zéèàùâûîiïüäÀÂÆÁÄÃÅĀÉÈÊËĘĖĒÎÏÌÍĮĪÔŒºÖÒÓÕØŌŸÿªæáãåāëęėēúūīįíìi ]{2,}$/,
                      setValidFirstnameInput,
                      setFirstnameInputError,
                      setFirstnameInput,
                      "Prénom : 3 lettres minimum"
                    );
                  }}
                  helperText={firstnameInputError}
                />
                <TextField
                  value={lastnameInput}
                  style={{ margin: "10px 0px" }}
                  id={"lastname"}
                  label={"Nom de famille"}
                  variant="standard"
                  type={"text"}
                  placeholder={"Entrez votre nom de famille"}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  onChange={(e) => {
                    handlerInput(
                      e,
                      /^[A-Za-z][A-Za-zéèàùâûîiïüäÀÂÆÁÄÃÅĀÉÈÊËĘĖĒÎÏÌÍĮĪÔŒºÖÒÓÕØŌŸÿªæáãåāëęėēúūīįíìi ]{2,}$/,
                      setValidLastnameInput,
                      setLastnameInputError,
                      setLastnameInput,
                      "Nom de famille : 3 lettres minimum"
                    );
                  }}
                  helperText={lastnameInputError}
                />
                <TextField
                  value={passwordInput}
                  style={{ margin: "10px 0px" }}
                  id={"password"}
                  label={"Mot de passe"}
                  variant="standard"
                  type={"password"}
                  placeholder={"Entrez votre mot de passe"}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  onChange={(e) => {
                    handlerInputPassword(
                      e,
                      /^(?=.*[a-zéèàùâûîiïüäÀÂÆÁÄÃÅĀÉÈÊËĘĖĒÎÏÌÍĮĪÔŒºÖÒÓÕØŌŸÿªæáãåāëęėēúūīįíìi]).{1,}$/,
                      setValidPasswordInput,
                      setPasswordInputError,
                      setPasswordInput,
                      "Mot de passe : doit avoir une lettre ne minuscule, un nombre et 8 caractères minimum"
                    );
                  }}
                  helperText={passwordInputError}
                />
                <TextField
                  value={passwordComfirmInput}
                  style={{ margin: "10px 0px" }}
                  id={"passwordComfirm"}
                  label={"Comfirmation mot de passe"}
                  variant="standard"
                  type={"password"}
                  placeholder={"Entrez comfirmation de votre mot de passe"}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  onChange={(e) => {
                    let removeSpace = "";
                    if (e.target.value.charAt(0) === " ") {
                      removeSpace = e.target.value.replace(/\s/, "");
                      setPasswordComfirmInput(removeSpace);
                    } else {
                      removeSpace = e.target.value.replace(/\s+/g, "");
                      setPasswordComfirmInput(removeSpace);
                    }
                    if (
                      passwordInput.length > 0 &&
                      removeSpace !== passwordInput
                    ) {
                      setValidPasswordComfirmInput(false);
                      setPasswordComfirmError(
                        "Comfirmation mot de passe : les mots de passe doivent être identique"
                      );
                    } else {
                      setValidPasswordComfirmInput(true);

                      setPasswordComfirmError("");
                    }
                  }}
                  helperText={passwordComfirmInputError}
                />
                <TextField
                  value={emailInput}
                  style={{ margin: "10px 0px" }}
                  id={"email"}
                  label={"Email"}
                  variant="standard"
                  type={"text"}
                  placeholder={"Entrez votre email"}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  onChange={(e) => {
                    handlerInput(
                      e,
                      /^([\w.-]+)@([\w-]+)((\.(\w){2,})+)$/,
                      setValidEmailInput,
                      setEmailInputError,
                      setEmailInput,
                      "Email : doit être un email valide"
                    );
                  }}
                  helperText={emailInputError}
                />
                <FormControl
                  style={{ margin: "10px 0px" }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Êtes vous majeur ?</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => {
                            if (e.target.checked === true) {
                              setMajorInput("true");
                              setValidMajorInput(true);
                              setMajorInputError("");
                            } else {
                              setMajorInput("false");
                              setValidMajorInput(false);
                              setMajorInputError(
                                "Vous devez être majeur pour vous inscrire"
                              );
                            }
                          }}
                          name="gilad"
                        />
                      }
                      label={validMajorInput ? "Oui" : "Non"}
                    />
                  </FormGroup>
                  <FormHelperText>{majorInputError}</FormHelperText>
                </FormControl>
                <input
                  type="text"
                  name="pseudo"
                  id="pseudo"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  onChange={(e) => {
                    setInputPseudo(e.target.value);
                  }}
                />
                <p>
                  En vous inscrivant, vous acceptez nos{" "}
                  <Link
                    target="_blank"
                    href={"/conditions-generales-utilisations"}
                  >
                    conditions générales d&apos;utilisations
                  </Link>{" "}
                  de notre site
                </p>
                <div className={styles.register__form__submit}>
                  {isLoading === false && (
                    <input
                      className={styles.register__form__submit__btn}
                      type="submit"
                      value="S'inscrire"
                    />
                  )}
                  {isLoading === true && (
                    <button
                      disabled
                      className={styles.register__form__submit__btn__load}
                    >
                      Chargement ...
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FormRegister;

// /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
